from .db import db

class Application(db.Model):
    __tablename__ = 'applications'

    id = db.Column(db.Integer,primary_key=True, nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(255), nullable=False)
    cellphone = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    zipcode = db.Column(db.String(50), nullable=False)
    home_type = db.Column(db.String(50), nullable=False)
    pets = db.Column(db.Text, nullable=False)
    household = db.Column(db.Text, nullable=False)
    vet_name = db.Column(db.String(50), nullable=False)
    vet_cellphone = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.Date , nullable=False)
    updated_at = db.Column(db.Date , nullable=False)

    # user = db.relationship("User", back_populates="applications")

    def to_dict(self):
        return {
            'id': self.id,
            'listing_id': self.listing_id,
            'user_id': self.user_id,
            'name' : self.name,
            'age' : self.age,
            'email' : self.email,
            'cellphone': self.cellphone,
            'address' : self.address,
            'city' : self.city,
            'state' : self.state,
            'zipcode' : self.zipcode,
            'home_type': self.home_type,
            'pets': self.pets,
            'household' : self.household,
            'vet_name': self.vet_name,
            'vet_cellphone': self.vet_cellphone,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at)
        }
