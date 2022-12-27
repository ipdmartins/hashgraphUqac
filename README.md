<h1 align="center">
  Hedera Hashgraph
</h1>
<p align="center">
  <a href="">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="This project is released under the MIT license." />
  </a>
</p>
<p align="left">
  The <a href="https://hedera.com/consensus-service">Hashgraph</a> is a consensus algorithm managed and sustained by the <a href="https://hedera.com/council">Hedera Organization</a>. 
  We implemented a Javascript code using Hedera's Javascript library. We intend to to test the Hashgraph performance as parte of an academic assignment at UQAC, more specifically in the 
  subject of Design/architecture of cloud computing systems. 
</p>
<p>
	You can get this project on your local dev environment in with these steps:
	<ol>
		<li>
			**System setup**
      Make sure you have NodeJS and (npm or yarn) installed on your machine.
		</li> 	
		<li>
			**Clone this repository.**</br>
			In your preferred shell type: git clone https://github.com/ipdmartins/hashgraphUqac.git
		</li> 	
    <li>
      You need to create two accounts on https://portal.hedera.com/register. After this
      you can access your public, private, and user ID keys. Having these keys you
      need to create a .env file in your project with the follwoing variables:
      USER_1_ID, USER_1_PRIVATE_KEY, USER_1_PUBLIC_KEY, USER_2_ID, USER_2_PRIVATE_KEY, USER_2_PUBLIC_KEY. You need to paste the respective key to the respective variable.
    </li>
    <li>
      The sendMessage.js file line 12 and the transferFunds.js file line 14, you
      have the path definition to save a log file in your computer. You need to set
      a local directory path of your machine to save the file properly.
    </li>
    <li>
			**Testing**</br>
			After cloning the project. You type (cd hashgraphUqac) to access your local directory. Type npm install. Then you type (node index.js). You will see some logs printed out in your shell. Then you can look for the log file in the path you set. 
		</li>
	</ol>
</p>
