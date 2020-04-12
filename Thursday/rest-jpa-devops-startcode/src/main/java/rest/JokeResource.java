package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import dto.ChuckJokeDTO;
import dto.CombinedJokesDTO;
import dto.DadJokeDTO;
import java.io.IOException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import utils.HttpUtils;

/**
 * REST Web Service
 *
 * @author lam
 */
@Path("jokes")
public class JokeResource {

    private static final Gson GSON = new GsonBuilder().create();
    @Context
    private UriInfo context;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJokes() throws IOException {
        String chuck = HttpUtils.fetchData("https://api.chucknorris.io/jokes/random");
        String dad = HttpUtils.fetchData("https://icanhazdadjoke.com/");
        ChuckJokeDTO chuckJoke = GSON.fromJson(chuck, ChuckJokeDTO.class);
        DadJokeDTO dadJoke = GSON.fromJson(dad, DadJokeDTO.class);
        CombinedJokesDTO combined = new CombinedJokesDTO(chuckJoke,dadJoke);
        String combinedJson = GSON.toJson(combined);
        return combinedJson;
    }

}
