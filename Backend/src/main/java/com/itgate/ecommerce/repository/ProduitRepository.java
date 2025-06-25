package com.itgate.ecommerce.repository;

import com.itgate.ecommerce.models.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProduitRepository extends JpaRepository<Produit,Long> {
}
