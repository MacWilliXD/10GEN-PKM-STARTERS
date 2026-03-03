# 🖼️ Guía de Imágenes del Proyecto

## 📋 Imágenes Necesarias

Para completar el proyecto visualmente, necesitarás las siguientes imágenes:

### Starters de Gen 10 (Personalizados)

Coloca estas imágenes en: `Web/images/starters/`

1. **browt.png**
   - Descripción: Pollito con haba/brote saliendo del pico
   - Tipo: Planta
   - Dimensiones recomendadas: 180x180px
   - Formato: PNG con transparencia

2. **pombon.png**
   - Descripción: Perrito de fuego con pecho brillante
   - Tipo: Fuego
   - Dimensiones recomendadas: 180x180px
   - Formato: PNG con transparencia

3. **gecqua.png**
   - Descripción: Gecko acuático con cola para lanzar agua
   - Tipo: Agua
   - Dimensiones recomendadas: 180x180px
   - Formato: PNG con transparencia

### Placeholders (Opcionales)

Si no tienes las imágenes de los starters, el código ya tiene fallbacks automáticos:

1. **placeholder-grass.png** (Verde, icono de planta)
2. **placeholder-fire.png** (Rojo/Naranja, icono de fuego)
3. **placeholder-water.png** (Azul, icono de agua)

Dimensiones: 180x180px cada uno

### Banner Regional (Opcional)

Para mejorar el diseño, puedes agregar:

**indonesia-banner.jpg**
- Ubicación: `Web/images/`
- Descripción: Paisaje tropical de Indonesia
- Dimensiones: 1400x300px
- Uso: Banner de región en la cabecera

---

## 🎨 Recursos para Obtener Imágenes

### Opción 1: Crear Tus Propias Imágenes

**Herramientas Recomendadas:**
- **DALL-E / Midjourney**: Generar con IA
- **Photoshop / GIMP**: Diseño manual
- **Procreate**: Para tablets
- **Figma**: Diseño vectorial

**Prompts Sugeridos para IA:**

```
Browt:
"Cute Pokemon starter, baby chick with bean sprout growing from beak, 
grass type, green and yellow colors, chibi style, transparent background"

Pombon:
"Cute Pokemon starter, fire type puppy, glowing chest, orange and red colors,
innocent expression, chibi style, transparent background"

Gecqua:
"Cute Pokemon starter, water type gecko, blue colors, water sphere on tail,
intelligent look, chibi style, transparent background"
```

### Opción 2: Usar Placeholders Temporales

El proyecto funciona perfectamente sin imágenes personalizadas. Usa íconos o símbolos:

- 🌱 Emoji de planta para Browt
- 🔥 Emoji de fuego para Pombon
- 💧 Emoji de agua para Gecqua

### Opción 3: Pokémon Reales de PokéAPI

Si prefieres usar Pokémon existentes como placeholders:

```javascript
// Las imágenes se obtienen automáticamente de PokéAPI
// Ejemplos de sprites:
Bulbasaur: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
Charmander: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png
Squirtle: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png
```

---

## 📐 Especificaciones Técnicas

### Formato de Archivo
- **Preferido:** PNG con canal alpha (transparencia)
- **Alternativo:** JPG (pero sin transparencia)
- **Evitar:** GIF (baja calidad)

### Dimensiones
- **Mínimo:** 150x150px
- **Recomendado:** 180x180px
- **Máximo:** 300x300px

### Tamaño de Archivo
- **Ideal:** 20-50 KB
- **Máximo:** 200 KB por imagen
- Optimiza con TinyPNG o ImageOptim

### Estilo Visual
- **Líneas:** Limpias y definidas
- **Colores:** Vibrantes pero no saturados
- **Fondo:** Transparente
- **Sombras:** Suaves, drop shadow recomendado
- **Pose:** Frontal, ligeramente en ángulo 3/4

---

## 🔧 Cómo Agregar las Imágenes

1. **Crear el directorio (si no existe):**
   ```
   Web/images/starters/
   ```

2. **Nombrar correctamente:**
   - Nombres en minúsculas
   - Sin espacios ni caracteres especiales
   - Extensión .png

3. **Verificar rutas:**
   
   En `index.html`, las imágenes se cargan así:
   ```html
   <img src="../images/starters/browt.png" alt="Browt">
   ```

4. **Optimizar imágenes:**
   
   Usa herramientas online:
   - https://tinypng.com/
   - https://squoosh.app/
   - https://imageoptim.com/

---

## 🎭 Fallbacks Actuales

El código ya tiene fallbacks implementados:

```html
<img src="../images/starters/browt.png" 
     alt="Browt" 
     onerror="this.src='../images/placeholder-grass.png'">
```

Si la imagen principal no existe, intentará cargar el placeholder.
Si el placeholder tampoco existe, mostrará el alt text "Browt".

---

## 📦 Estructura Final de Imágenes

```
Web/images/
├── starters/
│   ├── browt.png          ← Tu diseño personalizado
│   ├── pombon.png         ← Tu diseño personalizado
│   └── gecqua.png         ← Tu diseño personalizado
├── placeholders/
│   ├── placeholder-grass.png
│   ├── placeholder-fire.png
│   └── placeholder-water.png
└── indonesia-banner.jpg   ← Opcional
```

---

## 💡 Ejemplos de Diseño

### Browt (Planta)
```
Colores principales: #78C850 (verde), #F4E04D (amarillo)
Elementos: Pico con brote, plumas verdes, ojos grandes
Personalidad: Alegre, torpe, energético
```

### Pombon (Fuego)
```
Colores principales: #F08030 (naranja), #FFD700 (dorado)
Elementos: Pecho brillante, orejas caídas, cola pequeña
Personalidad: Simpático, inocente, cálido
```

### Gecqua (Agua)
```
Colores principales: #6890F0 (azul), #4CB5F5 (celeste)
Elementos: Cola con esfera de agua, ojos inteligentes
Personalidad: Listo, pretencioso, elegante
```

---

## ✅ Checklist de Imágenes

- [ ] Browt creado y optimizado
- [ ] Pombon creado y optimizado
- [ ] Gecqua creado y optimizado
- [ ] Placeholders creados (opcional)
- [ ] Banner de Indonesia (opcional)
- [ ] Todas las imágenes < 200KB
- [ ] Formato PNG con transparencia
- [ ] Nombres correctos en minúsculas
- [ ] Imágenes colocadas en `/images/starters/`
- [ ] Probado en navegador

---

## 🚀 Sin Imágenes También Funciona

**¡Importante!** El proyecto es completamente funcional sin imágenes personalizadas:

- Las cards se verán bien con los fondos de colores
- Los emojis en los badges son suficientes
- El foco está en el análisis y predicción
- Las gráficas son lo más importante

**Prioriza la funcionalidad sobre las imágenes.** Puedes agregarlas después.

---

## 📞 Recursos Adicionales

- **Paletas de Colores:** https://coolors.co/
- **Iconos Pokémon:** https://iconarchive.com/
- **Sprites Oficiales:** https://pokemondb.net/sprites
- **Generador IA:** https://www.midjourney.com/
- **Editor Online:** https://www.photopea.com/

---

¡Que tu creatividad vuele como Browt! 🌱🔥💧
