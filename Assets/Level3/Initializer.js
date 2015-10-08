#pragma strict
import CommunicationCotroler;
//scripts:
public var cControler:CommunicationCotroler;
public var player1Move:playerMoveSendToSocket;
public var player2Move:playerMoveSendToSocket;
public var player3Move:playerMoveSendToSocket;

//game objects:
public var objCControler:GameObject;
public var player1:GameObject;
public var player2:GameObject;
public var player3:GameObject;

//camera:
public var player1Camera:Camera;
public var player2Camera:Camera;
public var player3Camera:Camera;



function Awake(){
	Application.targetFrameRate=70;
	objCControler=GameObject.Find("Communicator");
	cControler=objCControler.GetComponent(CommunicationCotroler);
	var currentPlayer=cControler.player;
	player1=GameObject.Find("Player1");
	player2=GameObject.Find("Player2");
	player3=GameObject.Find("Player3");
	
	player1Move=player1.GetComponent(playerMoveSendToSocket);
	player2Move=player2.GetComponent(playerMoveSendToSocket);
	player3Move=player3.GetComponent(playerMoveSendToSocket);
	
	if(currentPlayer.Contains("player1"))
	{
		player2Camera.enabled=false;
		player3Camera.enabled=false;
		player1Camera.enabled=true;
		
		player1Move.enabled=true;
		player2Move.enabled=false;
		player3Move.enabled=false;
		
	}
	if(currentPlayer.Contains("player2"))
	{
		player1Camera.enabled=false;
		player3Camera.enabled=false;
		player2Camera.enabled=true;
		
		player2Move.enabled=true;
		player1Move.enabled=false;
		player3Move.enabled=false;
		
	}
	if(currentPlayer.Contains("player3"))
	{
		player2Camera.enabled=false;
		player1Camera.enabled=false;
		player3Camera.enabled=true;
		
		player3Move.enabled=true;
		player2Move.enabled=false;
		player1Move.enabled=false;
		
	}
	
}
