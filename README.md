## VR Component Creator

Live at 138.68.254.68

![Map](http://i.imgur.com/u6gxyXp.png)

VR Component Creator allows users to add 2D text, images, and videos in virtual space within 360 degree videos. It utilizes A-Frame to build out 3D primitive components and then injects user-selected textures via React/JavaScript.

![Map](http://i.imgur.com/QK2PK6F.png)

# How to Use

-Open the creator by visiting 138.68.254.68 in any modern browser  
-Click and drag anywhere on the screen to move the center cursor. Note that this cursor serves as your 'mouse pointer', meaning that you have to aim it at a target first, and then click in place to trigger  
-If you have a 360 degree video URL (MUST BE IN MP4 FORMAT!!) in mind, select the URL bar in the middle of the screen and paste in your link when prompted. Otherwise, it's recommended to select one of the following 3 presets:  
  
1.) Museum Tour (3MB)- Smallest of the three options, low-res video of an evolutionary gallery. Due to the device being used to film, this video gets cut off at the top and bottom 'poles' of the render  
2.) City (10MB)- Medium sized video of a roller coaster through a virtual city in an infinite loop. Best option for combining smooth playback with good quality  
3.) Hackathon (20MB+)- Mid-res quality video I took at a VR Hackathon a few months ago using a Ricoh Theta S device. Due to the larger file size users will likely experience some stutter/lag during the initial load. This preset also has a few 2D images/text elements included as examples  
  
-Once a 360 degree video has been selected, click on the green button in the middle of the virtual view to enable placement mode (both the button and cursor will turn red to reflect this). Click and drag the cursor to the desired location for a new 2D element, then click again to open the New Element menu  
-Choose between Image, Text, or Video, and then provide the URL as well as additional options when prompted. Finally, click on the green checkmark icon to place your element (or on the 'Back' icon to return)  
-If viewing on a desktop browser, you can use your 'W' 'A' 'S' 'D' keys to move within this 3D space  

# Known Issues

-When selecting the type/text/characteristics of a new element, some clickable sections may encounter random 'dead zones' where clicks don't trigger the appropriate action. For example, clicking in the middle of the URL bar when placing a new element occasionally doesn't register and therefore doesn't trigger the window prompt. This is an unknown issue associated with videospheres that I've thus been unable to eliminate; if this occurs, it's best to drag the cursor to a slightly different location within the target and try again  
-NO FORM VALIDATION is enabled! The focus was more on getting the 3D video and element creation aspects functional. If you've entered incorrect information during the element creation stage, please use the 'Back' button at the very bottom to re-enter your selections
