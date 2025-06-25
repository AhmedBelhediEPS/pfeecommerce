package com.itgate.ecommerce.repository;

import com.itgate.ecommerce.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client,Long> {
    Client findByEmail(String email);
    Client findByUsername(String username);
}
