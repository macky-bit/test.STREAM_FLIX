// MOVIE

// movie_id (PK)
// title
// overview
// release_date
// runtime
// popularity
// vote_average
// collection_id (FK → COLLECTION)

// GENRE

// genre_id (PK)
// name

// MOVIE_GENRE (junction table, many-to-many)

// movie_id (FK → MOVIE)
// genre_id (FK → GENRE)

// PERSON

// person_id (PK)
// name
// known_for_department
// profile_path

// COLLECTION;

// collection_id(PK);
// name;
// overview;

// KEYWORD

// keyword_id (PK)
// name

// KEYWORD_MAP (junction table)

// movie_id (FK → MOVIE)
// keyword_id (FK → KEYWORD)