from config import db

class Pokemon(db.Model):
    entry_id = db.Column(db.Integer, primary_key = True)
    pokemon_name = db.Column(db.String(50), nullable = False)
    pokemon_type = db.Column(db.String(50), nullable = False)
    pokemon_sprite_link = db.Column(db.String(50), nullable = True)

    def to_json(self):
        return{
            "entry": self.entry_id,
            "name": self.pokemon_name,
            "type": self.pokemon_type,
            "link": self.pokemon_sprite_link,
        }