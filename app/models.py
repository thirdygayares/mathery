import uuid

from enum import Enum
from typing import Optional, List
from datetime import datetime, UTC
from sqlalchemy import Column, String, ARRAY
from sqlmodel import SQLModel, Field, Relationship


class RoleEnum(str, Enum):
    SUPERADMIN = "SUPERADMIN"
    USER = "USER"


class UserRole(SQLModel, table=True):
    user_role_id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.user_id")
    role: RoleEnum

    user: Optional["User"] = Relationship(back_populates="roles")


class Config(SQLModel, table=True):
    config_id: Optional[int] = Field(default=None, primary_key=True)
    config_name: str
    config_value: str


class User(SQLModel, table=True):
    user_id: Optional[int] = Field(default=None, primary_key=True)
    user_uuid: uuid.UUID = Field(default_factory=uuid.uuid4, index=True, unique=True)
    first_name: str
    last_name: str
    email: str = Field(index=True, unique=True)
    password: str
    created_at: datetime = Field(default_factory=lambda:  datetime.now(UTC))
    updated_at: datetime = Field(default_factory=lambda:  datetime.now(UTC))
    deleted_at: Optional[datetime] = None

    roles: List[UserRole] = Relationship(back_populates="user")
    modules_created: List["Module"] = Relationship(back_populates="creator")
    topics_created: List["Topic"] = Relationship(back_populates="creator")
    exercises: List["Exercise"] = Relationship(back_populates="user")
    matheries: List["Mathery"] = Relationship(back_populates="user")


class Image(SQLModel, table=True):
    image_id: Optional[int] = Field(default=None, primary_key=True)
    file_name: str
    description: str
    image: str  # path
    created_at: datetime = Field(default_factory=lambda:  datetime.now(UTC))
    updated_at: datetime = Field(default_factory=lambda:  datetime.now(UTC))
    deleted_at: Optional[datetime] = None

    modules: List["Module"] = Relationship(back_populates="image")
    topics: List["Topic"] = Relationship(back_populates="image")


class Module(SQLModel, table=True):
    module_id: Optional[int] = Field(default=None, primary_key=True)
    module_uuid: uuid.UUID = Field(default_factory=uuid.uuid4, index=True, unique=True)
    name: str
    description: str
    image_id: Optional[int] = Field(default=None, foreign_key="image.image_id")
    created_by: int = Field(foreign_key="user.user_id")
    created_at: datetime = Field(default_factory=lambda:  datetime.now(UTC))
    updated_at: datetime = Field(default_factory=lambda:  datetime.now(UTC))
    deleted_at: Optional[datetime] = None

    creator: Optional[User] = Relationship(back_populates="modules_created")
    image: Optional[Image] = Relationship(back_populates="modules")
    topics: List["Topic"] = Relationship(back_populates="module")


class Topic(SQLModel, table=True):
    topic_id: Optional[int] = Field(default=None, primary_key=True)
    topic_uuid: uuid.UUID = Field(default_factory=uuid.uuid4, index=True, unique=True)
    module_id: int = Field(foreign_key="module.module_id")
    name: str
    description: str
    image_id: Optional[int] = Field(default=None, foreign_key="image.image_id")
    created_by: int = Field(foreign_key="user.user_id")
    created_at: datetime = Field(default_factory=lambda:  datetime.now(UTC))
    updated_at: datetime = Field(default_factory=lambda:  datetime.now(UTC))
    deleted_at: Optional[datetime] = None

    module: Optional[Module] = Relationship(back_populates="topics")
    creator: Optional[User] = Relationship(back_populates="topics_created")
    image: Optional[Image] = Relationship(back_populates="topics")
    exercises: List["Exercise"] = Relationship(back_populates="topic")
    matheries: List["Mathery"] = Relationship(back_populates="topic")


class ExerciseStatus(str, Enum):
    PENDING = "PENDING"
    ONGOING = "ONGOING"
    CHECKING = "CHECKING"
    DONE = "DONE"


class ExerciseType(str, Enum):
    IMAGE = "IMAGE"
    MCQ = "MCQ"


class Exercise(SQLModel, table=True):
    exercise_id: Optional[int] = Field(default=None, primary_key=True)
    exercise_uuid: uuid.UUID = Field(default_factory=uuid.uuid4, index=True, unique=True)
    user_id: int = Field(foreign_key="user.user_id")
    topic_id: Optional[int] = Field(default=None, foreign_key="topic.topic_id")
    name: str
    summary: str
    results_summary: Optional[str] = None
    items: Optional[int] = None
    total_score: Optional[int] = None
    status: ExerciseStatus
    type: ExerciseType
    created_at: datetime = Field(default_factory=lambda:  datetime.now(UTC))
    updated_at: datetime = Field(default_factory=lambda:  datetime.now(UTC))
    deleted_at: Optional[datetime] = None

    user: Optional[User] = Relationship(back_populates="exercises")
    topic: Optional[Topic] = Relationship(back_populates="exercises")
    mcqs: List["ExerciseMCQ"] = Relationship(back_populates="exercise")
    images: List["ExerciseImage"] = Relationship(back_populates="exercise")


class ExerciseMCQ(SQLModel, table=True):
    exercise_mcq_id: Optional[int] = Field(default=None, primary_key=True)
    exercise_id: int = Field(foreign_key="exercise.exercise_id")
    question: str
    options: List[str] = Field(sa_column=Column(ARRAY(String)))
    correct_answer: int
    score: Optional[int] = None
    user_answer: Optional[str] = None
    is_correct: Optional[bool] = None
    result_summary: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda:  datetime.now(UTC))
    updated_at: datetime = Field(default_factory=lambda:  datetime.now(UTC))
    deleted_at: Optional[datetime] = None

    exercise: Optional[Exercise] = Relationship(back_populates="mcqs")


class ExerciseImage(SQLModel, table=True):
    exercise_image_id: Optional[int] = Field(default=None, primary_key=True)
    exercise_id: int = Field(foreign_key="exercise.exercise_id")
    question: str
    correct_answer: int
    score: Optional[int] = None
    user_answer: Optional[str] = None
    is_correct: Optional[bool] = None
    result_summary: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda:  datetime.now(UTC))
    updated_at: datetime = Field(default_factory=lambda:  datetime.now(UTC))
    deleted_at: Optional[datetime] = None

    exercise: Optional[Exercise] = Relationship(back_populates="images")


class Mathery(SQLModel, table=True):
    mathery_id: Optional[int] = Field(default=None, primary_key=True)
    mathery_uuid: uuid.UUID = Field(default_factory=uuid.uuid4, index=True, unique=True)
    user_id: int = Field(foreign_key="user.user_id")
    topic_id: Optional[int] = Field(default=None, foreign_key="topic.topic_id")
    name: str
    summary: str
    created_at: datetime = Field(default_factory=lambda:  datetime.now(datetime.UTC))
    updated_at: datetime = Field(default_factory=lambda:  datetime.now(UTC))
    deleted_at: Optional[datetime] = None

    user: Optional[User] = Relationship(back_populates="matheries")
    topic: Optional[Topic] = Relationship(back_populates="matheries")
    convos: List["MatheryConvo"] = Relationship(back_populates="mathery")


class MessageType(str, Enum):
    TEXT = "TEXT"
    IMAGE = "IMAGE"
    MD = "MD"


class RoleType(str, Enum):
    USER = "USER"
    AI = "AI"


class MatheryConvo(SQLModel, table=True):
    mathery_convo_id: Optional[int] = Field(default=None, primary_key=True)
    mathery_id: int = Field(foreign_key="mathery.mathery_id")
    message: str
    type: MessageType
    role: RoleType
    created_at: datetime = Field(default_factory=lambda:  datetime.now(UTC))
    updated_at: datetime = Field(default_factory=lambda:  datetime.now(UTC))
    deleted_at: Optional[datetime] = None

    mathery: Optional[Mathery] = Relationship(back_populates="convos")
