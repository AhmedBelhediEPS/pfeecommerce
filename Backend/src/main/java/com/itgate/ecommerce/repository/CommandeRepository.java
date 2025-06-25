package com.itgate.ecommerce.repository;

import com.itgate.ecommerce.models.Commande;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeRepository extends JpaRepository<Commande,Long> {
}
