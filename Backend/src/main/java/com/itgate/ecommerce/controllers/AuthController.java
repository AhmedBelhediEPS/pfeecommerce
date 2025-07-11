package com.itgate.ecommerce.controllers;

import java.util.*;
import java.util.stream.Collectors;

import com.itgate.ecommerce.exception.TokenRefreshException;
import com.itgate.ecommerce.repository.RoleRepository;
import com.itgate.ecommerce.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.itgate.ecommerce.models.ERole;
import com.itgate.ecommerce.models.RefreshToken;
import com.itgate.ecommerce.models.Role;
import com.itgate.ecommerce.models.User;
import com.itgate.ecommerce.payload.request.LoginRequest;
import com.itgate.ecommerce.payload.request.SignupRequest;
import com.itgate.ecommerce.payload.request.TokenRefreshRequest;
import com.itgate.ecommerce.payload.response.JwtResponse;
import com.itgate.ecommerce.payload.response.MessageResponse;
import com.itgate.ecommerce.payload.response.TokenRefreshResponse;
import com.itgate.ecommerce.security.jwt.JwtUtils;
import com.itgate.ecommerce.security.services.RefreshTokenService;
import com.itgate.ecommerce.security.services.UserDetailsImpl;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  RefreshTokenService refreshTokenService;
  @Autowired
  private JavaMailSender mailSender;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
    Optional<User> u = userRepository.findByUsername(loginRequest.getUsername());
    if (u.get().getConfirm() == true) {
    SecurityContextHolder.getContext().setAuthentication(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    String jwt = jwtUtils.generateJwtToken(userDetails);

    List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
        .collect(Collectors.toList());

    RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

    return ResponseEntity.ok(new JwtResponse(jwt, refreshToken.getToken(), userDetails.getId(),
        userDetails.getUsername(), userDetails.getEmail(), roles,true));
    } else {
      //throw new RuntimeException("user not confirmed");
      return new ResponseEntity("user not confirmed", HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {


    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
    }

    // Create new user's account
    User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
        encoder.encode(signUpRequest.getPassword()));

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
        case "admin":
          Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(adminRole);

          break;
        case "fournisseur":
          Role fournisseurRole = roleRepository.findByName(ERole.ROLE_FOURNISSEUR)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(fournisseurRole);

          break;
          case "client":
            Role clientRole = roleRepository.findByName(ERole.ROLE_CLIENT)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(clientRole);

            break;
        default:
          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(userRole);
        }
      });
    }
    user.setConfirm(true);
    user.setRoles(roles);
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }


  @PostMapping("/forgetpassword")
  public HashMap<String, String> resetPassword(String email) throws MessagingException {
    HashMap message = new HashMap();
    User userexisting = userRepository.findByEmail(email);
    if (userexisting == null) {
      message.put("user", "user not found");
      return message;
    }

    UUID token = UUID.randomUUID();
    userexisting.setPasswordResetToken(token.toString());
    userexisting.setId(userexisting.getId());

    MimeMessage message1 = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message1);
    helper.setSubject("forget password:");
    helper.setFrom("admin@gmail.com");
    helper.setTo(userexisting.getEmail());
    helper.setText("<HTML><body><a href=\"http://localhost:4200/resetpassword/"
            + userexisting.getPasswordResetToken() + "\">Forget Password</a></body></HTML>", true);
    mailSender.send(message1);

    userRepository.saveAndFlush(userexisting);
    message.put("user", "user found and email is send");

    return message;
  }

  @PostMapping("/savePassword/{passwordResetToken}")
  public HashMap<String, String> savePassword(@PathVariable String passwordResetToken, String newPassword)
  {
    User userexisting = userRepository.findByPasswordResetToken(passwordResetToken);
    HashMap message = new HashMap();

    if(userexisting !=null)

    {
      userexisting.setId(userexisting.getId());
      userexisting.setPassword(new BCryptPasswordEncoder().encode(newPassword));
      userexisting.setPasswordResetToken(null);
      userRepository.save(userexisting);
      message.put("resetpassword", "proccesed");
      return message;
    } else

    {
      message.put("resetpassword", "failed");
      return message;
    }

  }




  @PostMapping("/refreshtoken")
  public ResponseEntity<?> refreshtoken(@Valid @RequestBody TokenRefreshRequest request) {
    String requestRefreshToken = request.getRefreshToken();

    return refreshTokenService.findByToken(requestRefreshToken)
        .map(refreshTokenService::verifyExpiration)
        .map(RefreshToken::getUser)
        .map(user -> {
          String token = jwtUtils.generateTokenFromUsername(user.getUsername());
          return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
        })
        .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
            "Refresh token is not in database!"));
  }
  
  @PostMapping("/signout")
  public ResponseEntity<?> logoutUser() {
    UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    Long userId = userDetails.getId();
    refreshTokenService.deleteByUserId(userId);
    return ResponseEntity.ok(new MessageResponse("Log out successful!"));
  }









}
