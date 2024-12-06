const request = require('supertest');
const { getAllMovies } = require('../controllers');
const { app } = require("../index.js")
const http = require('http');


jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllMovies: jest.fn(),
}))

let server;

beforeAll(async() => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll( async () => {
  server.close();
});

describe("Controller Function tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all movies", () => {
    let mockedeMovies = [
      {
        "movieId": 1,
        'title': Inception,
        'genre': Sci-Fi,
        'director': Christopher Nolan
      },
      {
        'movieId': 2,
        'title': 'The Shawshank Redemption',
        'genre': 'Drama',
        'director': 'Frank Darabont'
      },
      {
        'movieId': 3,
        'title': 'The Godfather',
        'genre': 'Crime',
        'director': 'Francis Ford Coppola'
      }
    ];

    getAllMovies.mockReturnValue(mockedeMovies);
    let result = getAllMovies();
    expect(result)toEqual(mockedeMovies);
    expect(result.length).toBe(3);
  });
});

describe("API Endpoint test", () => {
  it("GET /movies should get all movies", async () => {
    const res = await request(server).get("/movies");
    expect(res.status)toBe(200);
    expect(res.body).toEqual({
         movies : [
          {
            'movieId': 1,
            'title': 'Inception',
            'genre': 'Sci-Fi',
            'director': 'Christopher Nolan'
          },
          {
            'movieId': 2,
            'title': 'The Shawshank Redemption',
            'genre': 'Drama',
            'director': 'Frank Darabont'
          },
          {
            'movieId': 3,
            'title': 'The Godfather',
            'genre': 'Crime',
            'director': 'Francis Ford Coppola'
          }
      ];
    });
    expect(res.body.movies.length)toBe(3);
  });

  it("GET /movies/details/:id should get an movie by ID", async () => {
    const res = await request(server).get("/movies/details/1");
    expect(res.status)toBe(200);
    expect(res.body)toEqual({
      movie : {
        'movieId': 1,
    'title': 'Inception',
    'genre': 'Sci-Fi',
    'director': 'Christopher Nolan'
      },
    });
  });
});



