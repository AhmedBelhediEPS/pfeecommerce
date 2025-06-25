package com.itgate.ecommerce.repository;

import com.itgate.ecommerce.models.Client;
import com.itgate.ecommerce.models.Produit;
import com.itgate.ecommerce.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review,Long> {

//    Optional<Review> findByUserIdAndProductId (Long id_client, Long id_product);
//boolean existsByCustomerAndProduct(Client client, Produit produit);
//boolean existsByCustomerAndProduct(Client client, Produit produit);

    Review findByClientAndProduit(Client client, Produit produit);


}
