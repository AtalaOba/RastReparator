import webbrowser
import os
import re

# Styles and scripting for the page html frame and head
main_page_block = '''{mainframe}
'''

# The main page layout and title bar
title_page_block = '''{titlestringhtml}
	'''

# A single item entry html template with
image_block = '''{imagestringhtml}
'''
# A single item entry html template with
price_block = '''{pricestringhtml}
'''
# A single item entry html template with
tableinfo_block = '''{tableinfostringhtml}
'''

def create_url_media(urls):
'''after parse the code with beautifulsoup we need to get the text from this
 html label to put it as parameter for the item so after that we will use item.
 ItemDef class to create_url_media this push all the urlcrawis and the crawis for
 the html argv code parameters
'''

'''
def create_movie_tiles_content(movies):
    # The HTML content for this section of the page
    content = ''
    for movie in movies:
        # Extract the youtube ID from the url
        youtube_id_match = re.search(r'(?<=v=)[^&#]+', movie.trailer_youtube_url)
        youtube_id_match = youtube_id_match or re.search(r'(?<=be/)[^&#]+', movie.trailer_youtube_url)
        trailer_youtube_id = youtube_id_match.group(0) if youtube_id_match else None

        # Append the tile for the movie with its content filled in
        content += movie_tile_content.format(
            movie_title=movie.title,
            poster_image_url=movie.poster_image_url,
            trailer_youtube_id=trailer_youtube_id
        )
    return content
'''

def open_search_page(movies):
  # Create or overwrite the output file
  output_file = open('itemsearch{looplist}.html', 'w')

  # Replace the placeholder for the item parts with the actual dynamically generated content
  rendered_content = ()

  # Output the file
  output_file.write(main_page_block + rendered_content)
  output_file.close()

  # open the output file in the browser
  url = os.path.abspath(output_file.name)
  webbrowser.open('file://' + url, new=2) # open in a new tab, if possible
