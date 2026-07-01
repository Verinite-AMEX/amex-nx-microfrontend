package com.onlinehelper.onlinehelper.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "secret_questions")
@ToString(exclude = {"userAccess"})
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SecretQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long questionId;

    @Column(name = "question")
    private String question;

    @Column(name = "answer")
    private String answer;

    @ManyToOne
    @JoinColumn(name = "user_access_id", referencedColumnName = "access_id")
    private UserAccess userAccess;


    @Override
    public String toString() {
        return "SecretQuestion{" +
                "questionId=" + questionId +
                ", question='" + question + '\'' +
                ", answer='" + answer + '\'' +
                ", userAccess=" + userAccess +
                '}';
    }
}