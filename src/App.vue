 
    <!-- HTML -->

<template>
    <br>
    <br>
    <h1>Image to ASCII Converter</h1>
    <div id="main">
        <div id="inputCss">
            <label for="input">
                <input id="input" type="file" name="file" accept="image/*" @change="fileUploaded">
                <div id="fakeBtn">Upload File</div>
            </label>
            <span id="fileName">{{ fileName }}</span>
        </div>
        <div id="btns">
            <button @click="convert()">Convert</button>
            <button @click="download()" id="download">Download</button>
        </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div id="art">
        <pre>{{ art }}</pre>
    </div>
    <br>
    <br>
    <br>
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

    <!-- Cool CSS -->

<style scoped>
pre {
    font-family: 'Courier New', Courier, monospace;
    line-height: 3px;
    font-size: 5px;
    background-color: white;
    color: black;
}
h1 {
    text-align: center;
    font-size: 5vw;
}
#inputCss {
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    height: 5vh;
    border-radius: 15px;
    background-color: rgb(16, 16, 16);
}
label {
    cursor: pointer;
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 5vh;
    gap: 2vw;
}
#download {
    background-color: rgb(0, 208, 255);
}
#download:hover {
    background-color: rgb(0, 138, 169);
}
#fileName {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: fit-content;
    padding-left: 10vw;
    padding-right: 10vw;
}
#btns {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: fit-content;
    gap: 1vw;
}
#fakeBtn {
    background-color: rgb(230, 176, 82);
    color: black;
    height: 100%;
    border-radius: 15px;
    font-size: 1.1rem;
    font-weight: bold;
    width: 7rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
#fakeBtn:hover {
    background-color: rgb(186, 138, 72);
}
input {
    display: none;
}
button {
    height: 100%;
    width: 6rem;
    border-radius: 15px;
    border: none;
    background-color: rgb(82, 230, 82);
    font-size: 1.1rem;
    font-weight: bold;
}
button:hover {
    background-color: rgb(56, 155, 56); 
}
#main {
    flex-wrap: wrap;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 5vh;
    gap: 2vw;
}
#art {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    height: fit-content;
    width: 100%;
}
</style>