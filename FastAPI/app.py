import tensorflow_hub as hub
import pymongo
import pandas as pd
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Body
import numpy as np


model_url = "./universal_sentence_encoder_4"
model = hub.load(model_url)
def embed(text):
    return model([text])

def getData () :
    connection_string = "yout_string"

    # Create a MongoClient object
    client = pymongo.MongoClient(connection_string)

    # Access a specific database (replace 'your_database' with your actual database name)
    db = client.HackMatrix

    # # Access a specific collection within the database (replace 'your_collection' with your actual collection name)
    collection = db.doubt_solvers
    result_dict = {}

    for document in collection.find():
        # Get the values for description and expertise fields
        print("One")
        description = document.get('description', '')
        expertise = document.get('expertise', '')

        # Concatenate the values into a single string
        concatenated_string = f"{description} {expertise}"

        # Use the _id as the key and the concatenated string as the value
        result_dict[str(document['_id'])] = concatenated_string

    # Close the connection when done
    return result_dict;
    client.close()


def embed_strings(result_dict):
    embedded_dict = {}

    for doc_id, text in result_dict.items():
        # Embed the concatenated string using the embed function
        embeddings = embed(text)

        # Use the document ID as the key and embeddings as the value in the new dictionary
        embedded_dict[doc_id] = embeddings

    return embedded_dict

# Call the function with the result_dict obtained from the previous code
result_embeddings = embed_strings(result_dict)

def calculate_manhattan_distance(vector1, vector2):
    # Calculate Manhattan distance between two vectors
    return np.sum(np.abs(np.array(vector1) - np.array(vector2)))

def sort_dict_by_distance(query_vector):
    # Calculate distances and create a list of tuples (doc_id, distance)
    result_dict = getData();
    embedding_dict = embed_strings(result_dict);

    distances = [(doc_id, calculate_manhattan_distance(query_vector, vector))
                 for doc_id, vector in embedding_dict.items()]

    # Sort the list of tuples based on distances
    sorted_distances = sorted(distances, key=lambda x: x[1])

    # Create a new dictionary with sorted distances
    sorted_dict = {doc_id: embedding_dict[doc_id] for doc_id, _ in sorted_distances}

    return sorted_dict

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.post('/')
def sort_dict_by_distance(query_vector: str = Body(..., embed=True)):
    # Calculate distances and create a list of tuples (doc_id, distance)
    result_dict = getData();
    embedding_dict = embed_strings(result_dict);

    distances = [(doc_id, calculate_manhattan_distance(query_vector, vector))
                 for doc_id, vector in embedding_dict.items()]

    # Sort the list of tuples based on distances
    sorted_distances = sorted(distances, key=lambda x: x[1])

    # Create a new dictionary with sorted distances
    sorted_dict = {doc_id: embedding_dict[doc_id] for doc_id, _ in sorted_distances}

    return sorted_dict



if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
