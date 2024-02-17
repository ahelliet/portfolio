import { defineField, defineType } from "sanity";

export default defineType({
    title: 'Vidéo',
    name: 'video',
    type: 'document',
    fields: [
        { title: 'Title', name: 'title', type: 'string' },
        {
            title: 'Video file',
            name: 'videoFile',
            type: 'mux.video',
        },
    ],
})