
from sqlalchemy import Column, Integer, String, Text
from database import Base


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    owner   = Column(String(50), nullable=False)
    content = Column(Text, nullable=False)


class SearchableUser(Base):
    __tablename__ = "searchable_users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), nullable=False, index=True)
    role = Column(String(20), nullable=False)


class SecretFlag(Base):
    __tablename__ = "secret_flags"

    id = Column(Integer, primary_key=True, index=True)
    flag = Column(Text, nullable=False)


class Student(Base):
    __tablename__ = "students"

    id  = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    roll= Column(String(20), nullable=False)
    dept  = Column(String(100))
    year= Column(Integer)
    cgpa = Column(String(10))
    status  = Column(String(20))
    hostel = Column(String(50))









class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    classification = Column(String(50))
    content = Column(Text)
    author = Column(String(100))
