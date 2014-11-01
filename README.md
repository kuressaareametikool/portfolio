### About

This app turns a set of directories and files into a web portfolio. Just follow this structure:

* public
	* portfolio
		* author1
			* project1
				* info.txt
				* image1.jpg
				* image2.jpg
			* project2
				* info.txt
				* image1.png
		* author2
			* project1
				* info.txt
				* image1.jpg

_info.txt_ files are not required but they can add more info about the projects. They use following structure:

	Title (optional)
	--
	Description
	--
	List of Youtube or Vimeo video URLs, each in new line (optional)

### Installation

It's assumed you have NodeJS installed. If you have set up the directories as shown above, run

	node generate-index.js

Now you can point your browser to the /public directory in the (local) web server.
