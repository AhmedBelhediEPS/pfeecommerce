package com.itgate.ecommerce.repository;

import com.itgate.ecommerce.models.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategorieRepository extends JpaRepository<Categorie,Long> {
}
