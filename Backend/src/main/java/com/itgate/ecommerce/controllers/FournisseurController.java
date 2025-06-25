package com.itgate.ecommerce.controllers;

import com.itgate.ecommerce.models.*;
import com.itgate.ecommerce.payload.request.SignupRequest;
import com.itgate.ecommerce.payload.response.MessageResponse;
import com.itgate.ecommerce.repository.CategorieRepository;
import com.itgate.ecommerce.repository.FournisseurRepository;
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
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/fournisseur")
public class FournisseurController {
    private final Path rootLocation = Paths.get("upload-dir");

    @Autowired
    private FournisseurRepository fournisseurRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private StorageService storage;

    @GetMapping("/all")
    public List<Fournisseur> getallFournisseur(){
        return fournisseurRepository.findAll();
    }

    @PostMapping("/ajouter")
    public Fournisseur ajouterFournisseur(@RequestBody Fournisseur fournisseur){
        return fournisseurRepository.save(fournisseur);
    }

    @GetMapping("/getone/{id}")
    public Fournisseur getoneFournisseur(@PathVariable Long id){
        return fournisseurRepository.findById(id).get();
    }

    @PutMapping("/maj/{id}")
    public Fournisseur majFournisseur(@PathVariable Long id,@RequestBody Fournisseur f){
        Fournisseur f1=fournisseurRepository.findById(id).get();
        if(f1!=null){
            f.setId(id);
            f.setPassword(f1.getPassword());
            f.setImage(f1.getImage());
            f.setConfirm(f1.getConfirm());
            f.setRoles(f1.getRoles());
            return fournisseurRepository.saveAndFlush(f);
        }
        else{
            throw new RuntimeException("Echec !");
        }

    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> registerUser(
                                          @RequestParam(value = "file") MultipartFile file,@PathVariable Long id)
            throws MessagingException {
        Fournisseur f=fournisseurRepository.findById(id).get();
        if(f!=null) {
            f.setId(id);
            try {
                String fileName = Integer.toString(new Random().nextInt(1000000000));
                String ext = file.getOriginalFilename().substring(file.getOriginalFilename().indexOf('.'), file.getOriginalFilename().length());
                String name = file.getOriginalFilename().substring(0, file.getOriginalFilename().indexOf('.'));
                String original = name + fileName + ext;
                Files.copy(file.getInputStream(), this.rootLocation.resolve(original));
                f.setImage(original);


            } catch (Exception e) {
                throw new RuntimeException("FAIL File Problem BackEnd !");
            }
        }
        userRepository.save(f);

        return ResponseEntity.ok(new MessageResponse("Image registered successfully!"));
    }


    @DeleteMapping("/supprimer/{id}")
    public HashMap<String,String> supprimerFournisseur(@PathVariable Long id){
        HashMap<String,String> message=new HashMap<>();
        try {
            fournisseurRepository.deleteById(id);
            message.put("Etat : ","Le fournisseur a été supprimé");
        }
        catch(Exception e){
            message.put("Etat : ","Le fournisseur n'a pas été supprimé");
        }
        return message;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerFournisseur(@Valid SignupRequest signUpRequest,@RequestParam(value = "file") MultipartFile file) throws MessagingException {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        Fournisseur fournisseur = new Fournisseur(signUpRequest.getUsername(), signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),signUpRequest.getMatricule(),signUpRequest.getService(),signUpRequest.getSociete(),signUpRequest.getImage());

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {

            Role fournisseurRole = roleRepository.findByName(ERole.ROLE_FOURNISSEUR)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(fournisseurRole);


        }


        fournisseur.setRoles(roles);


        try {
            String fileName = Integer.toString(new Random().nextInt(1000000000));
            String ext = file.getOriginalFilename().substring(file.getOriginalFilename().indexOf('.'), file.getOriginalFilename().length());
            String name = file.getOriginalFilename().substring(0, file.getOriginalFilename().indexOf('.'));
            String original = name + fileName + ext;
            Files.copy(file.getInputStream(), this.rootLocation.resolve(original));
            fournisseur.setImage(original);



        }catch (Exception e){
            throw new RuntimeException("FAIL File Problem BackEnd !");
        }
        //mail confirmation
        fournisseur.setConfirm(false);
        String from ="fournisseur@gmail.com";
        String to = signUpRequest.getEmail();
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setSubject("Complete Registration!");
        helper.setFrom(from);
        helper.setTo(to);
        helper.setText("<HTML><body><a href=\"http://localhost:8080/fournisseur/majconfirm?email="
                +signUpRequest.getEmail()+"\">VERIFY</a></body></HTML>",true);
        mailSender.send(message);
////////////////////////////////////////////////

        userRepository.save(fournisseur);

        return ResponseEntity.ok(new MessageResponse("Fournisseur registered successfully!"));
    }


    @GetMapping("/majconfirm")
    public String majConfirm(String email){
        Fournisseur f1=fournisseurRepository.findByEmail(email);
        if(f1!=null){
            f1.setConfirm(true);
            fournisseurRepository.saveAndFlush(f1);
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
