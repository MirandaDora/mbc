#pragma strict
import CommunicationCotroler;
import SimpleJSON;
public var player1:String;
public var player2:String;
public var player3:String;

public var communicate:GameObject;
public var comm:CommunicationCotroler;

public var receivedData;
public var currentPlayer;

function Start () {
	communicate=GameObject.Find("Communicator");
	comm=communicate.GetComponent(CommunicationCotroler);
}

function Update () {
	player1=comm.player1;
	player2=comm.player2;
	player3=comm.player3;
	
}
