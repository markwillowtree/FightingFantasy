class CytoRepository {
    cy
    debug = false;
    constructor(playthrough, containerId, debug = false) {
        this.debug = debug;
        this.cy = cytoscape({
            container: $(`#${containerId}`)
            , style: cytoscape.stylesheet()
            .selector('node')
            .css({
                'height': 'label',
                'width': 'label',
                'text-max-width': '200px',
                'background-color': '#FFFFF0',
                'text-color': '#000000',
                'text-wrap': 'wrap',
                'text-halign': 'center',
                'text-valign': 'center',
                'shape': 'round-rectangle',
                'padding': '2px',
                'font-family': 'cursive'
            })
        });

        this.updateGraph(playthrough);

        this.cy.emit('dragfreeon select grabon');
    }

    updateGraph(playthrough) {
        this.cy.$('node').remove();
        this.cy.$('edge').remove();

        var startParagraph = playthrough.startParagraph;

        this.cy.add([
            {
                group: 'nodes',
                data: { id: `${startParagraph.id}` },
                position: { x: startParagraph.xPos, y: startParagraph.yPos }
            }
        ]);
        this.cy.$(`#${startParagraph.id}`)
            .css({ label: `${startParagraph.number} ${startParagraph.description}`  });

        if (this.debug) console.log(`Adding node ${startParagraph.id}`);

        var prev = startParagraph;
        var curr = startParagraph.toParagraph;

        while (curr != undefined) {
            if (prev.id == undefined || curr.id == undefined)
                throw 'invalid node id';

            this.cy.add([
                {
                    group: 'nodes',
                    data: { id: `${curr.id}` },
                    position: { x: curr.xPos, y: curr.yPos }
                },
                //{ group: 'edges', data: { id: `${prev.id}${curr.id}`, source: `${prev.id}`, target: `${curr.id}`} }
                { group: 'edges', data: { source: `${prev.id}`, target: `${curr.id}` } }
            ]);
            
            if (this.debug) console.log(`Adding node ${curr.id} and edge ${prev.id}${curr.id}`);

            this.cy.$(`#${curr.id}`).css({ label: `${curr.number} ${curr.description}` });

            if (this.debug) console.log(`Adding description ${curr.description} on ${curr.id}`);

            prev = curr;
            curr = curr.toParagraph;
        }

        console.log(this.cy.elements().jsons());

        var nodes = this.cy.nodes();
        var lastElement = nodes[nodes.length - 1];

        // center on last element
        this.cy.center(lastElement);
    }

    incrementZoom() {
        var zoom = this.cy.zoom();
        this.cy.zoom(zoom + 0.2);
    }

    decrementZoom() {
        var zoom = this.cy.zoom();
        this.cy.zoom(zoom - 0.2);
    }

    resetZoom() {
        var elements = this.cy.elements();

        // if there is only one paragraph
        if (playthrough.startParagraph.toParagraph == undefined) {
            this.cy.fit(elements, 200);
        }
        else {
            this.doLayout();
        }
    }

    editParagraph(paragraphId, paragraphNumber, paragraphDescription) {
        this.cy.$(`#${paragraphId}`).css({ label: `${paragraphNumber}. ${paragraphDescription}` });
    }

    deleteParagraph(paragraphId) {
        this.cy.remove(`#${paragraphId}`);
    }
}