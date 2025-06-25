package com.itgate.ecommerce.repository;

import com.itgate.ecommerce.models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin,Long> {
    Admin findByEmail(String email);
}
