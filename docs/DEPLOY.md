The extension works best on Ubuntu 21.04 and macOS
You will need to install the following:

1. Nodejs 12:
	Go to https://nodejs.org/en/download/
	Select the option best suitable for your environment
	Or on Ubuntu/Debian environment you can use the following:		
		sudo apt-get autoremove --purge nodejs yarn 
		curl -fsSL <https://deb.nodesource.com/setup_16.x> | sudo -E bash -
		sudo apt-get install -y nodejs

	To install it on mac with homebrew:
		brew install node

2. Yarn:
	After you have installed node.js, you can use the following command to install yarn
		npm install --global yarn
	To check if you have installed it properly, type this command
		yarn —version
3. Parcel:
	There are 2 ways to install this.
	Using yarn
		yarn add --dev parcel
	Using npm:
	npm install --save-dev parcel

4. Chrome 
	Go to https://www.google.com/chrome/
	Click download chrome

5. Lastly, you need access to the internet to run this extension

After installing all the required packages, you can download our code from github.

1. After downloading the code, open it in a coding environment like VS Code. In the terminal type:
	
	yarn install
	
	yarn run build
	
	yarn run start

Yarn run build and start will build the code.

2. After typing this command you can see how long it took to build the extension

3. In chrome, go to chrome://extensions/

4. Click on "Load unpacked" in the upper left corner

5. Then in the folder where the code is, select the subfolder called "dist"

6. Click select and the extension will be loaded on the browser

7. Go to https://youtu.be/Y4EABGSesk8. We have been using this video to test our extension.

8. If there is an ad before the video is played, then skip the ad or wait till the ad is over, because our extension doesn’t work on ads. 

9. There is an icon shaped like a puzzle piece called extension in the upper right corner of chrome. Click this icon.

10. A menu will appear which contains all the extension you have on chrome. It should include YouTube Voice. Click on the pin so that it will pin the extension over there. Then click the extension the extension should start working.

