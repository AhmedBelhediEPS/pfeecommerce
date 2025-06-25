package com.itgate.ecommerce.repository;

import com.itgate.ecommerce.models.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact,Long> {


}
