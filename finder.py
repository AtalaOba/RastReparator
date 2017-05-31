import sys

import item
'''import web'''

from bs4 import BeautifulSoup
import urllib
import requests

import xml.etree.ElementTree as ET

'''Parseamos el xml buscando todas las urls
'''
tree = ET.parse('sitemap2.xml')
root = tree.getroot()

'''Imprimimos los parametros que usamos como argumento para nuestro buscador.
'''
print sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4]


'''creamos un array con las urls que nos interesan segun lo que hemos buscado'''
urls = []
for child in root:
    url = child[0].text
    if sys.argv[1] in url and sys.argv[2] in url and sys.argv[3] in url and sys.argv[4] in url:
        urls.append(child[0].text)

'''
Este paso es para comprobar lo que estamos guardando en el array.
for url in urls:
    print url
Usaremos las urls como base para poder parsear los elementos que necesitamos
self,item_title,item_category,item_brand,item_ref,item_availability,item_prize,item_labels,item_url
'''
itemsugly = []
for url in urls:
    print url

    '''
    itemugly = urllib.urlopen(url)
    itemsugly.append(itemugly)

beautyitems = []
for itemugly in itemsugly:
    beautyitem = BeautifulSoup(itemugly, "lxml")
    beautyitems.append(beautyitem)

for beautyitem in beautyitems:
    print beautyitem.title
    img = beautyitem.find("a", rel="galeria_producto")
    print img
    pvp = beautyitem.find("span", {'class':'pvp'})
    print pvp
    tableinfo = beautyitem.find("div", {'class':'description_section'})
    print tableinfo
    print beautyitem
'''
'''
print url
parsedata = requests.get(url)
parsedatas.append(parsedata)

Integraremos beautifulsoup4 con requests y urllib, pudiendo asi analizar el codigo fuente de cada url, del cual
obtendremos los campos necesarios para inicializar nuestra web.
El codigo inferior en comentarios es el que nos dira si el codigo esta accesible.
Posteriormente nos centraremos en los 7 apartados necesarios para mostrar la informacion
Vinculacion codigo-clase
<table class="product_info">
self.title=item_title => <title>Data</title> esto esta fuera de la tabla
self.category=item_category => <td><a>Data</a></td>
self.brand=item_brand =><td><a>Data</a></td>
self.ref=item_ref => <td>Data<td>
self.availability=item_availability => <span class=stock-si>Data</span>
self.prize=item_prize => <span class="pvp"></span>
self.labels=item_labels => <div class="nuevo || original"><>
self.url=item_url => parsed from xml
'''

'''products_web_search = item.ItemDef()'''
