from flask import request, jsonify
from config import app, db
from models import Pokemon
import requests
import random

# GET request to retrieve all Pokemon from the database
@app.route("/allPokemon", methods=["GET"])
def get_all_pokemon():
    pokemon_list = []
    entries = Pokemon.query.all()

    for entry in entries:
        pokemon_list.append(entry.to_json())

    return jsonify({"All Pokemon": pokemon_list})

# GET request to retrieve random Pokemon for user to guess
@app.route("/pokemon", methods=["GET"])
def get_random_pokemon():
    guess_id = random.randint(1,1025)
    pokemon = Pokemon.query.filter_by(entry_id = guess_id).first()
    pokemon_to_guess = pokemon.to_json()

    return jsonify({"pokemon": pokemon_to_guess})

# POST request to handle word display
@app.route("/nameDisplay", methods=["POST"])
def handle_word_display():
    name = request.json.get("name")
    correct_letters = request.json.get("letters")
    
    display = name
    for character in name:
        display = display.replace(character, character + " ")
        if(character not in correct_letters):
            display = display.replace(character, "_ ")
    
    display = display.strip()
    
    return jsonify({"display": display})

# POST request to handle user letter guesses
@app.route("/letterInput", methods=["POST"])
def handle_letter_input():
    name = request.json.get("name")
    guessed_letter = request.json.get("letter")

    for letter in name:
        if(guessed_letter == letter):
            return jsonify({"result": "correct"})
    
    return jsonify({"result": "failed"})

# POST request to handle user full name guesses
@app.route("/nameInput", methods=["POST"])
def handle_name_input():
    name = request.json.get("name")
    guessed_name = request.json.get("guess")

    if(name == guessed_name):
        return jsonify({"result": "correct guess"})
    
    return jsonify({"result": "incorrect guess"})


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)

# **One-time API request to store Pokemon data into a list (not designed for repeated use)**

# def get_pokemon_list():
    # api_url = "https://pokeapi.co/api/v2/pokemon/" 
    # pokemon_list = []

    # while(True):
        # response = requests.get(api_url)
        # data = response.json()
        # pokemon_list.extend(data["results"])
        # api_url = data["next"] 

        # if(api_url == None):
            # break

    # return pokemon_list[:1025]  

# **One-time POST request to store list entries into database (not designed for repeated use)**

# @app.route("/populateDB", methods=["POST"])
# def populate_db():
    # pokemon_list = get_pokemon_list()
    
    # for pokemon in pokemon_list:
        # pokemon_name = pokemon['name']
        # pokemon_url = pokemon['url']

        # response = requests.get(pokemon_url)
        # data = response.json()

        # pokemon_sprite_link = data['sprites']['front_default'] 

        # type1 = data['types'][0]['type']['name']
        # type2 = ""
        # if(len(data['types']) > 1):
            # type2 = "-" + data['types'][1]['type']['name']

        # pokemon_type = type1+type2

        # added_pokemon = Pokemon(pokemon_name = pokemon_name, pokemon_type = pokemon_type, 
                                # pokemon_sprite_link = pokemon_sprite_link)
    
        # db.session.add(added_pokemon)

    # db.session.commit()

    # return jsonify({"message" : "All Pokemon added to database successfully!"})






