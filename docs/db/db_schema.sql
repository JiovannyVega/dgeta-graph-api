CREATE TABLE `roles` (
  `role_id` INT PRIMARY KEY AUTO_INCREMENT,
  `role_name` VARCHAR(50) UNIQUE NOT NULL,
  `description` TEXT
);

CREATE TABLE `users` (
  `user_id` INT PRIMARY KEY AUTO_INCREMENT,
  `role_id` INT NOT NULL,
  `username` VARCHAR(50) UNIQUE NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `registered_at` TIMESTAMP,
  `last_login` TIMESTAMP,
  `active` BOOLEAN DEFAULT true
);

CREATE TABLE `persons` (
  `person_id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT UNIQUE NOT NULL,
  `curp` VARCHAR(18) UNIQUE,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100),
  `mother_last_name` VARCHAR(100),
  `birth_date` DATE,
  `sex` ENUM ('Male', 'Female', 'Other'),
  `phone` VARCHAR(15),
  `mobile` VARCHAR(15),
  `address_id` INT,
  `photo` VARCHAR(255),
  `emergency_contact_name` VARCHAR(100),
  `emergency_contact_phone` VARCHAR(15)
);

CREATE TABLE `addresses` (
  `address_id` INT PRIMARY KEY AUTO_INCREMENT,
  `state_id` INT,
  `municipality_id` INT,
  `street` VARCHAR(255),
  `ext_number` VARCHAR(20),
  `int_number` VARCHAR(20),
  `neighborhood` VARCHAR(150),
  `postal_code` VARCHAR(10),
  `references` TEXT
);

CREATE TABLE `states` (
  `state_id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `code` VARCHAR(10)
);

CREATE TABLE `municipalities` (
  `municipality_id` INT PRIMARY KEY AUTO_INCREMENT,
  `state_id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL
);

CREATE TABLE `specialties` (
  `specialty_id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `code` VARCHAR(20) UNIQUE NOT NULL,
  `description` TEXT
);

CREATE TABLE `academic_periods` (
  `period_id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(20) UNIQUE NOT NULL,
  `start_date` DATE,
  `end_date` DATE,
  `active` BOOLEAN DEFAULT true
);

CREATE TABLE `study_plans` (
  `plan_id` INT PRIMARY KEY AUTO_INCREMENT,
  `specialty_id` INT NOT NULL,
  `subject_id` INT NOT NULL,
  `semester` INT NOT NULL,
  `mandatory` BOOLEAN DEFAULT true,
  `curriculum_year` INT
);

CREATE TABLE `subjects` (
  `subject_id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `code` VARCHAR(40) UNIQUE NOT NULL,
  `credits` INT,
  `theory_hours` INT,
  `practice_hours` INT,
  `description` TEXT
);

CREATE TABLE `groups` (
  `group_id` INT PRIMARY KEY AUTO_INCREMENT,
  `group_name` VARCHAR(50) NOT NULL,
  `shift` ENUM ('Morning', 'Afternoon', 'Evening') NOT NULL,
  `semester` INT,
  `specialty_id` INT,
  `period_id` INT,
  `max_capacity` INT,
  `active` BOOLEAN DEFAULT true
);

CREATE TABLE `classes` (
  `class_id` INT PRIMARY KEY AUTO_INCREMENT,
  `group_id` INT NOT NULL,
  `subject_id` INT NOT NULL,
  `teacher_id` INT,
  `period_id` INT NOT NULL,
  `classroom` VARCHAR(50),
  `weekly_hours` INT,
  `real_capacity` INT
);

CREATE TABLE `students` (
  `student_id` INT PRIMARY KEY AUTO_INCREMENT,
  `person_id` INT UNIQUE NOT NULL,
  `group_id` INT,
  `control_number` VARCHAR(20) UNIQUE NOT NULL,
  `middle_school_gpa` DECIMAL(4,2),
  `previous_school` VARCHAR(200),
  `status` ENUM ('Active', 'Inactive', 'Graduated', 'Dropped') DEFAULT 'Active',
  `admission_date` DATE
);

CREATE TABLE `teachers` (
  `teacher_id` INT PRIMARY KEY AUTO_INCREMENT,
  `person_id` INT UNIQUE NOT NULL,
  `employee_number` VARCHAR(20) UNIQUE NOT NULL,
  `academic_degree` VARCHAR(100),
  `specialty_id` INT,
  `status` ENUM ('Active', 'Inactive') DEFAULT 'Active',
  `hire_date` DATE
);

CREATE TABLE `evaluations` (
  `evaluation_id` INT PRIMARY KEY AUTO_INCREMENT,
  `class_id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `weight` DECIMAL(5,2),
  `scheduled_date` DATE,
  `type` VARCHAR(50)
);

CREATE TABLE `grades` (
  `grade_id` INT PRIMARY KEY AUTO_INCREMENT,
  `evaluation_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `score` DECIMAL(6,2) NOT NULL,
  `updated_at` TIMESTAMP,
  `comment` TEXT
);

CREATE TABLE `tutoring` (
  `tutoring_id` INT PRIMARY KEY AUTO_INCREMENT,
  `teacher_id` INT NOT NULL,
  `group_id` INT NOT NULL,
  `period_id` INT NOT NULL,
  `description` TEXT
);

CREATE TABLE `individual_tutoring` (
  `individual_tutoring_id` INT PRIMARY KEY AUTO_INCREMENT,
  `tutoring_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `session_date` TIMESTAMP NOT NULL,
  `presented_situation` TEXT NOT NULL,
  `provided_support` TEXT NOT NULL,
  `results` TEXT,
  `observations` TEXT,
  `referred` BOOLEAN DEFAULT false,
  `referral_agency` VARCHAR(200)
);

CREATE TABLE `incident_types` (
  `incident_type_id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT
);

CREATE TABLE `incidents` (
  `incident_id` INT PRIMARY KEY AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `reported_by_teacher_id` INT NOT NULL,
  `incident_type_id` INT,
  `incident_date` DATE NOT NULL,
  `reported_at` TIMESTAMP,
  `description` TEXT NOT NULL,
  `actions_taken` TEXT,
  `student_commitments` TEXT,
  `status` ENUM ('Reported', 'In Progress', 'Resolved') DEFAULT 'Reported'
);

CREATE TABLE `questionnaires` (
  `questionnaire_id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `description` TEXT,
  `version` VARCHAR(20),
  `created_at` DATE,
  `period_id` INT
);

CREATE TABLE `questions` (
  `question_id` INT PRIMARY KEY AUTO_INCREMENT,
  `questionnaire_id` INT NOT NULL,
  `text` TEXT NOT NULL,
  `answer_type` ENUM ('BOOLEAN', 'NUMERIC', 'TEXT', 'OPTIONS') NOT NULL,
  `is_risk` BOOLEAN DEFAULT false,
  `order` INT NOT NULL
);

CREATE TABLE `answers` (
  `answer_id` INT PRIMARY KEY AUTO_INCREMENT,
  `question_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `value_boolean` BOOLEAN,
  `value_numeric` DECIMAL(10,2),
  `value_text` TEXT,
  `answered_at` TIMESTAMP
);

CREATE TABLE `questionnaire_results` (
  `result_id` INT PRIMARY KEY AUTO_INCREMENT,
  `questionnaire_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `application_date` DATE NOT NULL,
  `total_score` DECIMAL(8,2),
  `risk_level` VARCHAR(50),
  `observations` TEXT
);

CREATE TABLE `learning_style_categories` (
  `category_id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `description` TEXT
);

CREATE TABLE `learning_styles` (
  `style_id` INT PRIMARY KEY AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `application_date` DATE NOT NULL,
  `observations` TEXT
);

CREATE TABLE `learning_style_results` (
  `result_id` INT PRIMARY KEY AUTO_INCREMENT,
  `style_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `score` INT NOT NULL
);

CREATE TABLE `tutoring_evaluations` (
  `evaluation_id` INT PRIMARY KEY AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `tutoring_id` INT NOT NULL,
  `evaluation_date` DATE NOT NULL,
  `identifies_tutor` BOOLEAN,
  `cordial_attention` BOOLEAN,
  `doubts_resolved` BOOLEAN,
  `enough_time` BOOLEAN,
  `sessions_received` INT,
  `individual_tutoring` BOOLEAN,
  `home_visits` BOOLEAN,
  `referrals` BOOLEAN,
  `academic_support` BOOLEAN,
  `high_school_guidance` BOOLEAN,
  `scholarship_info` BOOLEAN,
  `respectful_environment` BOOLEAN,
  `positive_impact` BOOLEAN,
  `importance_of_tutoring` BOOLEAN,
  `suggestions` TEXT
);

CREATE TABLE `self_evaluations` (
  `self_evaluation_id` INT PRIMARY KEY AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `evaluation_date` DATE NOT NULL,
  `achieved_goals` TEXT,
  `success_factors` TEXT,
  `failure_factors` TEXT,
  `problems` TEXT,
  `academic_performance` ENUM ('Excellent', 'Good', 'Average', 'Poor'),
  `tutor_evaluation` TEXT,
  `tutor_suggestions` TEXT,
  `final_feeling` TEXT
);

CREATE TABLE `family_members` (
  `family_member_id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `relationship` VARCHAR(80) NOT NULL,
  `phone` VARCHAR(15),
  `email` VARCHAR(100),
  `address` TEXT
);

CREATE TABLE `student_tutors` (
  `student_tutor_id` INT PRIMARY KEY AUTO_INCREMENT,
  `family_member_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `is_legal_guardian` BOOLEAN DEFAULT false,
  `lives_with_student` BOOLEAN DEFAULT true
);

CREATE TABLE `health_general` (
  `health_id` INT PRIMARY KEY AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `allergies` TEXT,
  `chronic_diseases` TEXT,
  `medications` TEXT,
  `disability` TEXT,
  `blood_type` ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'),
  `health_service` VARCHAR(200)
);

CREATE TABLE `health_psychological` (
  `psy_health_id` INT PRIMARY KEY AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `under_treatment` BOOLEAN,
  `treatment_start` DATE,
  `agency` VARCHAR(200),
  `observations` TEXT
);

CREATE TABLE `attendance` (
  `attendance_id` INT PRIMARY KEY AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `class_id` INT NOT NULL,
  `date` DATE NOT NULL,
  `present` BOOLEAN DEFAULT false,
  `justification` TEXT
);

CREATE TABLE `student_documents` (
  `document_id` INT PRIMARY KEY AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `document_type` VARCHAR(50) NOT NULL,
  `document_name` VARCHAR(200) NOT NULL,
  `file_path` VARCHAR(255) NOT NULL,
  `uploaded_at` TIMESTAMP
);

CREATE TABLE `academic_history` (
  `history_id` INT PRIMARY KEY AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `semester` INT NOT NULL,
  `gpa` DECIMAL(5,2),
  `subjects_passed` INT,
  `subjects_failed` INT,
  `observations` TEXT
);

CREATE TABLE `referrals` (
  `referral_id` INT PRIMARY KEY AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `tutor_id` INT NOT NULL,
  `referral_date` DATE NOT NULL,
  `agency` VARCHAR(200) NOT NULL,
  `presented_situation` TEXT NOT NULL,
  `reason` TEXT NOT NULL,
  `results` TEXT,
  `observations` TEXT
);

CREATE TABLE `academic_follow_up` (
  `follow_up_id` INT PRIMARY KEY AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `semester` INT NOT NULL,
  `actions` TEXT,
  `follow_up_date` DATE NOT NULL,
  `tutor_id` INT NOT NULL
);

CREATE TABLE `extracurricular_activities` (
  `activity_id` INT PRIMARY KEY AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `activity_name` VARCHAR(150) NOT NULL,
  `activity_type` ENUM ('Sports', 'Cultural', 'Academic', 'Volunteering', 'Other') NOT NULL,
  `period_id` INT NOT NULL,
  `hours` INT,
  `awards` TEXT
);

CREATE TABLE `conversations` (
  `conversation_id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(200),
  `is_group` BOOLEAN DEFAULT false,
  `creator_id` INT,
  `created_at` TIMESTAMP
);

CREATE TABLE `conversation_participants` (
  `participant_id` INT PRIMARY KEY AUTO_INCREMENT,
  `conversation_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `last_read` TIMESTAMP,
  `role_in_conversation` VARCHAR(50)
);

CREATE TABLE `messages` (
  `message_id` INT PRIMARY KEY AUTO_INCREMENT,
  `conversation_id` INT,
  `sender_id` INT NOT NULL,
  `subject` VARCHAR(200),
  `content` TEXT NOT NULL,
  `sent_at` TIMESTAMP,
  `read` BOOLEAN DEFAULT false
);

CREATE TABLE `configurations` (
  `config_id` INT PRIMARY KEY AUTO_INCREMENT,
  `config_name` VARCHAR(50) UNIQUE NOT NULL,
  `config_value` TEXT,
  `description` TEXT
);

ALTER TABLE `users` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);

ALTER TABLE `persons` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `states` ADD FOREIGN KEY (`state_id`) REFERENCES `addresses` (`state_id`);

ALTER TABLE `municipalities` ADD FOREIGN KEY (`municipality_id`) REFERENCES `addresses` (`municipality_id`);

ALTER TABLE `municipalities` ADD FOREIGN KEY (`state_id`) REFERENCES `states` (`state_id`);

ALTER TABLE `study_plans` ADD FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`specialty_id`);

ALTER TABLE `study_plans` ADD FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`);

ALTER TABLE `groups` ADD FOREIGN KEY (`period_id`) REFERENCES `academic_periods` (`period_id`);

ALTER TABLE `groups` ADD FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`specialty_id`);

ALTER TABLE `classes` ADD FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`);

ALTER TABLE `classes` ADD FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`);

ALTER TABLE `classes` ADD FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`);

ALTER TABLE `classes` ADD FOREIGN KEY (`period_id`) REFERENCES `academic_periods` (`period_id`);

ALTER TABLE `students` ADD FOREIGN KEY (`person_id`) REFERENCES `persons` (`person_id`);

ALTER TABLE `students` ADD FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`);

ALTER TABLE `teachers` ADD FOREIGN KEY (`person_id`) REFERENCES `persons` (`person_id`);

ALTER TABLE `evaluations` ADD FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`);

ALTER TABLE `grades` ADD FOREIGN KEY (`evaluation_id`) REFERENCES `evaluations` (`evaluation_id`);

ALTER TABLE `grades` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `tutoring` ADD FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`);

ALTER TABLE `tutoring` ADD FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`);

ALTER TABLE `tutoring` ADD FOREIGN KEY (`period_id`) REFERENCES `academic_periods` (`period_id`);

ALTER TABLE `individual_tutoring` ADD FOREIGN KEY (`tutoring_id`) REFERENCES `tutoring` (`tutoring_id`);

ALTER TABLE `individual_tutoring` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `incidents` ADD FOREIGN KEY (`incident_type_id`) REFERENCES `incident_types` (`incident_type_id`);

ALTER TABLE `incidents` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `incidents` ADD FOREIGN KEY (`reported_by_teacher_id`) REFERENCES `teachers` (`teacher_id`);

ALTER TABLE `questions` ADD FOREIGN KEY (`questionnaire_id`) REFERENCES `questionnaires` (`questionnaire_id`);

ALTER TABLE `answers` ADD FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`);

ALTER TABLE `answers` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `questionnaire_results` ADD FOREIGN KEY (`questionnaire_id`) REFERENCES `questionnaires` (`questionnaire_id`);

ALTER TABLE `questionnaire_results` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `learning_styles` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `learning_style_results` ADD FOREIGN KEY (`style_id`) REFERENCES `learning_styles` (`style_id`);

ALTER TABLE `learning_style_results` ADD FOREIGN KEY (`category_id`) REFERENCES `learning_style_categories` (`category_id`);

ALTER TABLE `tutoring_evaluations` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `tutoring_evaluations` ADD FOREIGN KEY (`tutoring_id`) REFERENCES `tutoring` (`tutoring_id`);

ALTER TABLE `self_evaluations` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `student_tutors` ADD FOREIGN KEY (`family_member_id`) REFERENCES `family_members` (`family_member_id`);

ALTER TABLE `student_tutors` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `health_general` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `health_psychological` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `attendance` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `attendance` ADD FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`);

ALTER TABLE `student_documents` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `academic_history` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `referrals` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `referrals` ADD FOREIGN KEY (`tutor_id`) REFERENCES `teachers` (`teacher_id`);

ALTER TABLE `academic_follow_up` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `academic_follow_up` ADD FOREIGN KEY (`tutor_id`) REFERENCES `teachers` (`teacher_id`);

ALTER TABLE `extracurricular_activities` ADD FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

ALTER TABLE `extracurricular_activities` ADD FOREIGN KEY (`period_id`) REFERENCES `academic_periods` (`period_id`);

ALTER TABLE `conversation_participants` ADD FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`conversation_id`);

ALTER TABLE `conversation_participants` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `messages` ADD FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`conversation_id`);

ALTER TABLE `messages` ADD FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`);
