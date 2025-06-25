package com.itgate.ecommerce.controllers;

import com.itgate.ecommerce.models.ChangePasswordRequest;
import com.itgate.ecommerce.models.Client;
import com.itgate.ecommerce.models.ERole;
import com.itgate.ecommerce.models.Role;
import com.itgate.ecommerce.payload.request.SignupRequest;
import com.itgate.ecommerce.payload.response.MessageResponse;
import com.itgate.ecommerce.repository.ClientRepository;
import com.itgate.ecommerce.repository.RoleRepository;
import com.itgate.ecommerce.repository.UserRepository;
import com.itgate.ecommerce.utils.StorageService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/client")
public class ClientController {
    private final Path rootLocation = Paths.get("upload-dir");
    @Autowired
    PasswordEncoder encoder;
@Autowired
    private ClientRepository clientRepository;
@Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;
@Autowired
private RoleRepository roleRepository;
    @Autowired
    private StorageService storage;

@GetMapping("/all")
public List<Client> getallClient(){
    return clientRepository.findAll();
}
    @PostMapping("/ajouter")
    public Client ajouterclient(@RequestBody Client client){
        return clientRepository.save(client);
    }

    @GetMapping("/getone/{id}")
    public Client getoneclient(@PathVariable Long id){
        return clientRepository.findById(id).get();
    }

    @PutMapping("/maj/{id}")
    public Client majclient(@PathVariable Long id, @RequestParam(value = "file") MultipartFile file, Client c){
        Client c1=clientRepository.findById(id).get();
        if(c1!=null){
            c.setId(id);
            c.setPassword(c1.getPassword());
            c.setConfirm(c1.getConfirm());
            c.setRoles(c1.getRoles());

            try {
                String fileName = Integer.toString(new Random().nextInt(1000000000));
                String ext = file.getOriginalFilename().substring(file.getOriginalFilename().indexOf('.'), file.getOriginalFilename().length());
                String name = file.getOriginalFilename().substring(0, file.getOriginalFilename().indexOf('.'));
                String original = name + fileName + ext;
                Files.copy(file.getInputStream(), this.rootLocation.resolve(original));
                c.setImage(original);


            } catch (Exception e) {
                throw new RuntimeException("FAIL File Problem BackEnd !");
            }

            return clientRepository.saveAndFlush(c);
        }
        else{
            throw new RuntimeException("Echec !");
        }
    }

    @DeleteMapping("/supprimer/{id}")
    public HashMap<String,String> supprimerclient(@PathVariable Long id){
        HashMap<String,String> message=new HashMap<>();
        try {
            clientRepository.deleteById(id);
            message.put("Etat : ","le client a été supprimé !");
        }
        catch(Exception e){
            message.put("Etat : ","le client n'a pas été supprimé !");
        }
        return message;
    }



    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid SignupRequest signUpRequest,
                                          @RequestParam(value = "file") MultipartFile file) throws MessagingException {



        String usernamePattern = "^[A-Za-z]+$";
        String passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
        String emailPattern = "^[a-zA-Z0-9]+@[a-zA-Z]{2,}\\.[a-zA-Z]{2,}$";
        if (!Pattern.matches(usernamePattern, signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is not valid!"));
        }

        if (!Pattern.matches(passwordPattern, signUpRequest.getPassword())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Password is not valid!"));
        }

        if (!Pattern.matches(emailPattern, signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is not valid!"));
        }







        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }


        // Create new user's account
        Client client = new Client(signUpRequest.getUsername(), signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),signUpRequest.getAdresse(),signUpRequest.getVille()
        ,signUpRequest.getPays(),signUpRequest.getCodepostal(),signUpRequest.getTelephone(),signUpRequest.getImage());

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {

            Role clientRole = roleRepository.findByName(ERole.ROLE_CLIENT)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(clientRole);


        }


        client.setRoles(roles);



        try {
            String fileName = Integer.toString(new Random().nextInt(1000000000));
            String ext = file.getOriginalFilename().substring(file.getOriginalFilename().indexOf('.'), file.getOriginalFilename().length());
            String name = file.getOriginalFilename().substring(0, file.getOriginalFilename().indexOf('.'));
            String original = name + fileName + ext;
            Files.copy(file.getInputStream(), this.rootLocation.resolve(original));
            client.setImage(original);



        }catch (Exception e){
            throw new RuntimeException("FAIL File Problem BackEnd !");
        }


//mail confirmation
        client.setConfirm(false);
        String from ="admin@gmail.com";
        String to = signUpRequest.getEmail();
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setSubject("Complete Registration!");
        helper.setFrom(from);
        helper.setTo(to);
        helper.setText("<HTML><body><a href=\"http://localhost:8080/client/majconfirm?email="
                +signUpRequest.getEmail()+"\">VERIFY</a></body></HTML>",true);
        mailSender.send(message);

////////////////////////////////////////////////

        userRepository.save(client);

        return ResponseEntity.ok(new MessageResponse("Client registered successfully!"));
    }

    @GetMapping("/majconfirm")
    public String majConfirm(String email){
        Client c1=clientRepository.findByEmail(email);
        if(c1!=null){
            c1.setConfirm(true);
            clientRepository.saveAndFlush(c1);
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







    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(Authentication authentication, @RequestBody ChangePasswordRequest request){

    String username=authentication.getName();
    Client client = clientRepository.findByUsername(username);

    if (client == null)
    {
    throw new IllegalArgumentException("Invalid user");
    }

    if(!encoder.matches(request.getOldPassword(),client.getPassword())){
        return new ResponseEntity("Invalid old password", HttpStatus.EXPECTATION_FAILED);
    }
    client.setPassword(encoder.encode(request.getNewPassword()));
    return ResponseEntity.ok(clientRepository.save(client));

    }




}
