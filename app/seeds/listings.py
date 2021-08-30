from app.models import db, Listing, Image
from datetime import datetime
import random
from faker import Faker
fake = Faker()
from app.seeds.images_list import list_of_pets

def thing(animal, array):
    k = 0
    gender = ['Male', 'Female']
    numbers = [2, 4, 5]
    while k < len(array):
        l = Listing (
            user_id = random.choice(numbers),
            name = fake.name().split(' ')[0],
            gender = random.choice(gender),
            age = random.randint(1, 20),
            pet_type = animal,
            description = fake.text(max_nb_chars=250),
            created_at=datetime.now(),
            updated_at= datetime.now()
        )
        db.session.add(l)
        db.session.commit()
        listing = l.to_dict()
        print(listing)
        img = Image(
            listing_id=listing['id'],
            image_url= array[k],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        db.session.add(img)
        db.session.commit()
        k += 1

def seed_listings():
    pet1 = Listing(
        user_id=2, name="Mason", gender="Male", age=5, pet_type="Rabbit",
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        created_at=datetime.now(), updated_at=datetime.now()
    )
    pet2 = Listing(
        user_id=2, name="Bubble", gender="Male", age=8, pet_type="Dog",
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        created_at=datetime.now(), updated_at=datetime.now()
    )
    pet3 = Listing(
        user_id=4, name="Rocker", gender="Female", age=1, pet_type="Guinea Pig",
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        created_at=datetime.now(), updated_at=datetime.now()
    )
    pet4 = Listing(
        user_id=4, name="Scarlet", gender="Female", age=2, pet_type="Dog",
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        created_at=datetime.now(), updated_at=datetime.now()
    )
    pet5 = Listing(
        user_id=5, name="Dragon", gender="Male", age=9, pet_type="Dog",
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        created_at=datetime.now(), updated_at=datetime.now()
    )
    pet6 = Listing(
        user_id=5, name="Stripes", gender="Male", age=5, pet_type="Cat",
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        created_at=datetime.now(), updated_at=datetime.now()
    )
    pet7 = Listing(
        user_id=2, name="Tofu", gender="Male", age=4, pet_type="Cat",
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        created_at=datetime.now(), updated_at=datetime.now()
    )
    pet8 = Listing(
        user_id=4, name="Fiona", gender="Female", age=2, pet_type="Dog",
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        created_at=datetime.now(), updated_at=datetime.now()
    )


    db.session.add(pet1)
    db.session.add(pet2)
    db.session.add(pet3)
    db.session.add(pet4)
    db.session.add(pet5)
    db.session.add(pet6)
    db.session.add(pet7)
    db.session.add(pet8)

    i = 0
    items = list(list_of_pets.keys())
    print(items)
    while i < len(items):
        if items[i] == 'cat':
            thing('Cat', list_of_pets['cat'])
        elif items[i] == 'dog':
            thing('Dog', list_of_pets['dog'])
        elif items[i] == 'rabbit':
            thing('Rabbit', list_of_pets['rabbit'])
        elif items[i] == 'horse':
            thing('Horse', list_of_pets['horse'])
        elif items[i] == 'guinea pig':
            thing('Rabbit', list_of_pets['rabbit'])
        elif items[i] == 'other':
            thing('Other', list_of_pets['other'])
        i += 1

    db.session.commit()

def undo_listings():
    db.session.execute('TRUNCATE listings RESTART IDENTITY CASCADE;')
    db.session.commit()