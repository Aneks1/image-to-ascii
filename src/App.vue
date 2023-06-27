<template>
    <div id="container">
        <h1 class="relative">Image to ASCII Converter</h1>
            <div id="inputCss" class="relative">
                <label for="input">
                    <input id="input" type="file" name="file" accept="image/*" @change="fileUploaded">
                    <div id="fakeBtn">Upload File</div>
                </label>
                <span id="fileName">{{ fileName }}</span>
            </div>
            <div id="btns" class="relative">
                <button @click="convert()">Convert</button>
                <button @click="download()">Download</button>
            </div>
        <div id="art" class="relative">
            <pre>{{ art }}</pre>
        </div>
    </div>
</template>

    <!-- Code -->

<script lang="ts">
import { defineComponent } from 'vue'
import Canvas from 'canvas'

export default defineComponent({
    data() {
        return {
            art: '',
            image: '',
            fileName: 'No File Selected'
        }
    },

    // Sets the file's data to a variable
    methods: {
        async fileUploaded(event: Event) {
            const target = event.target as HTMLInputElement
            if(target.files == null) return
            const file = target.files[0]
            this.fileName = file.name

            const reader = new FileReader()
            let image: ArrayBuffer | string | undefined | null = 'asduhasiduh'

            reader.onload = async () => { 
                if (reader.result != undefined) {
                    image = reader.result
                }
            }

            reader.readAsDataURL(file)

            setTimeout(() => {
                this.image = image as string
            }, 500);

        },

        /**
         * @method convert: Converts the image to the ASCII characters
        */
        async convert() {
            this.art = ''

            if(this.image == '') return window.alert('Please upload an image to convert')

            // This is the density sequence, which will determine the brightness of the art. We split it to have them as an array
            // The first characters have more density and look darker, the last ones have less density and look brighter
            const density = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'. '.split('')

            let img = await Canvas.loadImage(this.image)
            const canvas = Canvas.createCanvas(img.width, img.height)
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            let imgData = ctx.getImageData(0, 0, img.width, img.height).data

            if(img.width > document.body.clientWidth / 3 - 50) {
                imgData = await this.resizeImage()
                img.height = Math.floor((Math.floor(img.width / (img.width / ( document.body.clientWidth / 3  - 50))) * img.height) / img.width)
                img.width = Math.floor(img.width / (img.width / ( document.body.clientWidth / 3  - 50)))
                console.log('Condition:', img.width, img.height)
            }

            for(let i = 0; i < imgData.length; i+=4) {
                const r = imgData[i]
                const g = imgData[i + 1]
                const b = imgData[i + 2]
                const a = imgData[i + 3]

                let brightness = Math.floor((r + g + b) / 3)
                if(a == 0) brightness = 255
                const char = density[Math.floor(density.length / 256 * brightness)]

                // Converts the pixel to a character and adds it to the "art" string
                this.art += ( char == ' ' ? '\xa0' : char )
                // If it's the last pixel of the row, create a new line
                if(( (i / 4) % img.width ) == 0) this.art += '\n'
            }
        },

        async resizeImage(): Promise<Uint8ClampedArray> {
            const img = await Canvas.loadImage(this.image)
            const width = Math.floor(img.width / (img.width / ( document.body.clientWidth / 3  - 50)))
            const height = Math.floor((width * img.height) / img.width)
            console.log('Function: ', width, height)
            const canvas = Canvas.createCanvas(width, height)
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)
            return ctx.getImageData(0, 0, width, height).data
        },

        /**
         * @method download: Downloads the ASCII art as a .txt file
        */
        async download() {
            if(this.art == '') return window.alert('There is no art to be downloaded')
            const blob = new Blob([this.art])
            const url = window.URL.createObjectURL(blob)
            var link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'ascii-art.txt')
            document.body.appendChild(link)
            link.click()
            window.URL.revokeObjectURL(url)
        }
    }
})
</script>
    
<style>
    @import url("./styles.css");
</style>