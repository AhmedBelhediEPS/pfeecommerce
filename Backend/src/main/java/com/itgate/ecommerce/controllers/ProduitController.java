package com.itgate.ecommerce.controllers;

import com.itgate.ecommerce.models.*;
import com.itgate.ecommerce.repository.*;
import com.itgate.ecommerce.utils.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/produit")
public class ProduitController {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private SouscategorieRepository souscategorieRepository;

    @Autowired
    private FournisseurRepository fournisseurRepository;
    @Autowired
    private StorageService storage;




    private final Path rootLocation = Paths.get("upload-dir");
    @GetMapping("/all")
    public List<Produit> getallProduit(){
        return produitRepository.findAll();
    }

    @PostMapping("/ajouter")
    public Produit ajouterProduit(@RequestBody Produit produit){
        return produitRepository.save(produit);
    }



    // @PostMapping("/save/{idsubcategory}/{idprovider}")
    @RequestMapping(
            path = "/ajouter1/{id_souscategorie}/{id_fournisseur}",
            method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)


    public ResponseEntity<responseMessage> ajouterProduit(Produit produit, @RequestParam(value = "files")MultipartFile [] files, @PathVariable Long id_souscategorie, @PathVariable Long id_fournisseur) {

        /*storage.store(file);
        product.setImage(file.getOriginalFilename());*/
        String message="";
        try {

            ArrayList<String> fileNames = new ArrayList<>();

            Arrays.asList(files).stream().forEach(file -> {

                try{
                    String fileName = Integer.toString(new Random().nextInt(1000000000));
                    String ext = file.getOriginalFilename().substring(file.getOriginalFilename().indexOf('.'), file.getOriginalFilename().length());
                    String name = file.getOriginalFilename().substring(0, file.getOriginalFilename().indexOf('.'));
                    String original = name + fileName + ext;
                    Files.copy(file.getInputStream(), this.rootLocation.resolve(original));
                    fileNames.add(original);
                    produit.setImages(fileNames);

                }catch (Exception e){
                    throw new RuntimeException("FAIL File Problem BackEnd !");

                }
            });

            Souscategorie sc = souscategorieRepository.findById(id_souscategorie).get();
            produit.setSouscategorie(sc);
            Fournisseur f = fournisseurRepository.findById(id_fournisseur).get();
            produit.setFournisseur(f);


            produitRepository.save(produit);

            message = "Files uploaded successfully!" + fileNames;
            return ResponseEntity.status(HttpStatus.OK).body(new responseMessage(message));
        } catch (Exception e) {
            message = "Fail to upload files!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new responseMessage(message));

        }

    }

    @PostMapping("/ajouter2/{id_souscategorie}/{id_fournisseur}")
    public Produit ajouterProduit(@RequestBody Produit produit , @PathVariable Long id_souscategorie, @PathVariable Long id_fournisseur) {
        Souscategorie sc = souscategorieRepository.findById(id_souscategorie).get();
        produit.setSouscategorie(sc);
        Fournisseur f = fournisseurRepository.findById(id_fournisseur).get();
        produit.setFournisseur(f);
        return produitRepository.save(produit);
    }



    @GetMapping("/getone/{id}")
    public Produit getoneProduit(@PathVariable Long id){
        return produitRepository.findById(id).get();
    }




    @PutMapping("/maj/{id}/{id_souscategorie}")
    public ResponseEntity<responseMessage> majProduit(@PathVariable Long id, Produit p,@RequestParam(value = "files")MultipartFile [] files, @PathVariable Long id_souscategorie){

String message="";
     try {

        ArrayList<String> fileNames = new ArrayList<>();

        Arrays.asList(files).stream().forEach(file -> {

            try {
                String fileName = Integer.toString(new Random().nextInt(1000000000));
                String ext = file.getOriginalFilename().substring(file.getOriginalFilename().indexOf('.'), file.getOriginalFilename().length());
                String name = file.getOriginalFilename().substring(0, file.getOriginalFilename().indexOf('.'));
                String original = name + fileName + ext;
                Files.copy(file.getInputStream(), this.rootLocation.resolve(original));
                fileNames.add(original);
                p.setImages(fileNames);
            }catch (Exception e){
                throw new RuntimeException("FAIL File Problem BackEnd !");

            }
        });


        Produit p1=produitRepository.findById(id).get();
        if(p1!=null){
            p.setId(id);
           // p.setSouscategorie(p1.getSouscategorie());


                p.setImages(fileNames);

                Souscategorie sc = souscategorieRepository.findById(id_souscategorie).get();
                p.setSouscategorie(sc);
                p.setFournisseur(p1.getFournisseur());




            message = "Files uploaded successfully!" + fileNames;
            produitRepository.saveAndFlush(p);
        }
        else{
            throw new RuntimeException("FAIL!");
        }
         return ResponseEntity.status(HttpStatus.OK).body(new responseMessage(message));
     } catch (Exception e) {
         message = "Fail to upload files!";
         return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new responseMessage(message));

     }

    }




    @DeleteMapping("/supprimer/{id}")
    public HashMap<String,String> supprimerProduit(@PathVariable Long id){
        HashMap<String,String> message=new HashMap<>();
        try {
            produitRepository.deleteById(id);
            message.put("Etat : ","Le produit a été supprimé");
        }
        catch(Exception e){
            message.put("Etat : ","Le produit n'a pas été supprimé");
        }
        return message;
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
    @PutMapping("/updateqte/{id}")
    public Produit updateqte(@PathVariable Long id,String qte){
        Produit p=produitRepository.findById(id).get();
        if(p!=null){
            p.setId(id);
            p.setQuantite(qte);
            return produitRepository.saveAndFlush(p);
        }
        else{
            throw new RuntimeException("Echec !");
        }

    }

    @PutMapping("/updateqteclient/{id}")
    public Produit updateqteclient(@PathVariable Long id,String qte){
        Produit p=produitRepository.findById(id).get();
        if(p!=null){
            p.setId(id);
            p.setQteclient(qte);
            return produitRepository.saveAndFlush(p);
        }
        else{
            throw new RuntimeException("Echec !");
        }
    }





        @PutMapping("/updateAvgRating/{id}")
        public Produit updateAvgRating(@PathVariable Long id,String AvgRating){
            Produit p=produitRepository.findById(id).get();
            if(p!=null){
                p.setId(id);
                p.setAvgRating(AvgRating);
                return produitRepository.saveAndFlush(p);
            }
            else{
                throw new RuntimeException("Echec !");
            }



    }


















}
