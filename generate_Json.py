import os
import json

# Ruta base
ruta_projects = os.path.join(os.getcwd(), "Projects")

# Diccionario principal
estructura_json = {}

# Recorrer todo el árbol de carpetas
for carpeta_raiz, subcarpetas, archivos in os.walk(ruta_projects):
    if archivos:
        # Obtener ruta relativa desde Projects
        ruta_relativa = os.path.relpath(carpeta_raiz, ruta_projects).replace("\\", "/")
        
        # Separar los niveles de carpeta (esperamos al menos 2 niveles: categoría y subcarpeta)
        partes = ruta_relativa.split("/", 1)
        
        if len(partes) == 2:
            categoria, subcarpeta = partes
            rutas_relativas = [
                os.path.relpath(os.path.join(carpeta_raiz, archivo), os.getcwd()).replace("\\", "/")
                for archivo in archivos
            ]
            
            if categoria not in estructura_json:
                estructura_json[categoria] = {}
            
            estructura_json[categoria][subcarpeta] = rutas_relativas

# Guardar en archivo JSON
with open("Project_Route.json", "w", encoding="utf-8") as f:
    json.dump(estructura_json, f, indent=4, ensure_ascii=False)
