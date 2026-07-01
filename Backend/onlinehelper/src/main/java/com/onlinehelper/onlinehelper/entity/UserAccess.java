package com.onlinehelper.onlinehelper.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "user_access")
@ToString(exclude = {"secretQuestions", "suppUserDetails"})
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserAccess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "access_id")
    private Long accessId;

    @Column(name = "access_group_id")
    private String accessGroupId;

    @Column(name = "card_number")
    private String cardNumber;

    @Column(name = "business_user_id")
    private String businessUserId;

    @Column(name = "modified_by")
    private String modifiedBy;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "detail_id_fk", referencedColumnName = "detail_id")
    private SuppUserDetails suppUserDetails;

    @OneToMany(mappedBy = "userAccess", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SecretQuestion> secretQuestions;

    @Override
    public String toString() {
        return "UserAccess{" +
                "accessId=" + accessId +
                ", accessGroupId='" + accessGroupId + '\'' +
                ", cardNumber='" + cardNumber + '\'' +
                ", businessUserId='" + businessUserId + '\'' +
                ", modifiedBy='" + modifiedBy + '\'' +
                ", suppUserDetails=" + suppUserDetails +
                ", secretQuestions=" + secretQuestions +
                '}';
    }
}