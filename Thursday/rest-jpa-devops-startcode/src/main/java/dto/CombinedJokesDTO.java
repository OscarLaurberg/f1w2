/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dto;

/**
 *
 * @author oscar
 */
public class CombinedJokesDTO {
    private String joke1;
    private String joke1reference;
    private String joke2;
    private String joke2reference;

    public CombinedJokesDTO(ChuckJokeDTO chuck, DadJokeDTO dad) {
        this.joke1 = chuck.getValue();
        this.joke1reference = "https://api.chucknorris.io/jokes/random";
        this.joke2 = dad.getJoke();
        this.joke2reference = "https://icanhazdadjoke.com";
    
    
}
}