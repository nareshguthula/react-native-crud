package com.backend.reactbackend.web.rest;

import com.backend.reactbackend.web.rest.dto.Phone;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class PhoneResource {
    List<Phone> phones = new ArrayList<>();

    @CrossOrigin
    @PostMapping("/addPhone")
    public Map<String, Object> addPhone(@RequestBody Map<String, Object> phone) {
        Integer id = 0;
        if (!phones.isEmpty()) {
            Phone existingPhone = phones.get(phones.size() - 1);
            id = existingPhone.getId() + 1;
        }
        phones.add(new Phone(id, (String) phone.get("company"), (String) phone.get("model")));
        return Map.of("message", "Phone Added!!!", "phones", phones);
    }

    @CrossOrigin
    @PostMapping("/updatePhone")
    public Map<String, Object> updatePhone(@RequestBody Map<String, Object> phone) {
        Integer id = (Integer) phone.get("id");
        Optional<Phone> foundPhone = phones.stream().filter(phone1 -> id.equals(phone1.getId())).findFirst();
        foundPhone.ifPresent(targetPhone -> {
            targetPhone.setModel((String) phone.get("model"));
            targetPhone.setCompany((String) phone.get("company"));
        });
        return Map.of("message", "Phone Updated!!!", "phones", phones);
    }

    @CrossOrigin
    @DeleteMapping("/deletePhone/{id}")
    public Map<String, Object> deletePhone(@PathVariable("id") Integer id) {
        Optional<Phone> first = phones.stream().filter(targetPhone -> id.equals(targetPhone.getId())).findFirst();
        first.ifPresent(targetPhone -> phones.remove(targetPhone));
        return Map.of("message", "Phone Deleted!!!", "phones", phones);
    }
}
