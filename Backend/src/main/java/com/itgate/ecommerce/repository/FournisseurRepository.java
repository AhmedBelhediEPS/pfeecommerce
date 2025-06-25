package com.itgate.ecommerce.repository;

import com.itgate.ecommerce.models.Fournisseur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FournisseurRepository extends JpaRepository<Fournisseur,Long> {
    Fournisseur findByEmail(String email);
}
