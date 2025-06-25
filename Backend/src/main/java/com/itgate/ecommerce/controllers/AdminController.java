package com.itgate.ecommerce.controllers;

import com.itgate.ecommerce.models.*;
import com.itgate.ecommerce.payload.request.SignupRequest;
import com.itgate.ecommerce.payload.response.MessageResponse;
import com.itgate.ecommerce.repository.AdminRepository;
import com.itgate.ecommerce.repository.RoleRepository;
import com.itgate.ecommerce.repository.UserRepository;
import com.itgate.ecommerce.utils.StorageService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/admin")
public class AdminController {
    private final Path rootLocation = Paths.get("upload-dir");

    @Autowired
    PasswordEncoder encoder;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private RoleRepository roleRepository;


    @Autowired
    private StorageService storage;



    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid SignupRequest signUpRequest,
                                          @RequestParam(value = "file") MultipartFile file) throws MessagingException {

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }


        // Create new user's account
        Admin admin = new Admin(signUpRequest.getUsername(), signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),signUpRequest.getImage());

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {

            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);


        }


        admin.setRoles(roles);



        try {
            String fileName = Integer.toString(new Random().nextInt(1000000000));
            String ext = file.getOriginalFilename().substring(file.getOriginalFilename().indexOf('.'), file.getOriginalFilename().length());
            String name = file.getOriginalFilename().substring(0, file.getOriginalFilename().indexOf('.'));
            String original = name + fileName + ext;
            Files.copy(file.getInputStream(), this.rootLocation.resolve(original));
            admin.setImage(original);



        }catch (Exception e){
            throw new RuntimeException("FAIL File Problem BackEnd !");
        }


//mail confirmation
        admin.setConfirm(false);
        String from ="admin@gmail.com";
        String to = signUpRequest.getEmail();
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setSubject("Complete Registration!");
        helper.setFrom(from);
        helper.setTo(to);
        helper.setText("<HTML><body><a href=\"http://localhost:8080/admin/majconfirm?email="
                +signUpRequest.getEmail()+"\">VERIFY</a></body></HTML>",true);
        mailSender.send(message);

////////////////////////////////////////////////

        userRepository.save(admin);

        return ResponseEntity.ok(new MessageResponse("Admin registered successfully!"));
    }



    @GetMapping("/getone/{id}")
    public Admin getoneAdmin(@PathVariable Long id){
        return adminRepository.findById(id).get();
    }



    @GetMapping("/majconfirm")
    public String majConfirm(String email){
        Admin a1=adminRepository.findByEmail(email);
        if(a1!=null){
            a1.setConfirm(true);
            adminRepository.saveAndFlush(a1);
            return "congratulations email confirmed welcome to my app";
        }
        else{
            throw new RuntimeException("FAIL!");
        }
    }


    //Affichage de l'image
    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename){
        Resource file =storage.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachement; filename=\""
                        + file.getFilename()+"\"")
                .body(file);
    }



}
