package com.itgate.ecommerce.repository;

import com.itgate.ecommerce.models.Client;
import com.itgate.ecommerce.models.Produit;
import com.itgate.ecommerce.models.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist,Long> {
    Wishlist findByClient(Client client);

//    Wishlist findByProduit(Produit produit);


}
