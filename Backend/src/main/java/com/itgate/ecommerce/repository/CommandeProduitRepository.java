package com.itgate.ecommerce.repository;

import com.itgate.ecommerce.models.CommandeProduit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeProduitRepository extends JpaRepository<CommandeProduit,Long> {
}
