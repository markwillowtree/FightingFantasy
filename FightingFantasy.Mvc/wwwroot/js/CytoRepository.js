class CytoRepository {
    cy

    constructor(playthrough, containerId) {
        this.cy = cytoscape({
            container: $(`#${containerId}`)
            , style: cytoscape.stylesheet()
            .selector('node')
            .css({
                'height': 'label',
                'width': 'label',
                'background-color': '#ffffff',
                'text-color': '#000000',
                'text-wrap': 'wrap',
                'text-halign': 'center',
                'text-valign': 'center',
                'shape': 'rectangle',
                'padding': '2px'
            })
        });

        this.updateGraph(playthrough);
    }

    updateGraph(playthrough) {
        this.cy.$('node').remove();
        this.cy.$('edge').remove();

        var startParagraph = playthrough.startParagraph;

        this.cy.add([
            {
                group: 'nodes',
                data: { id: `${startParagraph.id}` },
                locked: false,
                grabbable: false,
                pannable: true
            }
        ]);
        this.cy.$(`#${startParagraph.id}`)
            .css({ label: `${startParagraph.number} ${startParagraph.description}`  });

        console.log(`Adding node ${startParagraph.id}`);

        var prev = startParagraph;
        var curr = startParagraph.toParagraph;

        while (curr != undefined) {
            this.cy.add([
                {
                    group: 'nodes',
                    data: { id: `${curr.id}` },
                    locked: false,
                    grabbable: false,
                    pannable: true
                },
                { group: 'edges', data: { id: `${prev.id}${curr.id}`, source: `${prev.id}`, target: `${curr.id}`} }
            ]);
            
            console.log(`Adding node ${curr.id} and edge ${prev.id}${curr.id}`);

            this.cy.$(`#${curr.id}`).css({ label: `${curr.number} ${curr.description}` });

            console.log(`Adding description ${curr.description} on ${curr.id}`);

            prev = curr;
            curr = curr.toParagraph;
        }

        var elements = this.cy.elements();

        // if there is only one paragraph
        if (playthrough.startParagraph.toParagraph == undefined) {
            this.cy.fit(elements, 200);
        }
        else {
            var layout = this.cy.layout({
                fit: true,
                name: 'grid'
            });
            layout.run();
            this.cy.fit(elements, 20);
        }
    }

    incrementZoom() {
        var zoom = this.cy.zoom();
        this.cy.zoom(zoom + 0.2);
        //this.zoomLevel += 0.2;
        //var layout = this.cy.layout({
        //    fit: false,
        //    name: 'grid',
        //    zoom: this.zoomLevel
        //});
        //layout.run();
    }

    decrementZoom() {
        var zoom = this.cy.zoom();
        this.cy.zoom(zoom - 0.2);
        //this.zoomLevel -= 0.2;
        //var layout = this.cy.layout({
        //    fit: false,
        //    name: 'grid',
        //    zoom: this.zoomLevel
        //});
        //layout.run();
    }

    resetZoom() {
        var elements = this.cy.elements();

        // if there is only one paragraph
        if (playthrough.startParagraph.toParagraph == undefined) {
            this.cy.fit(elements, 200);
        }
        else {
            var layout = this.cy.layout({
                fit: true,
                name: 'grid'
            });
            layout.run();
            this.cy.fit(elements, 20);
        }
    }


    appendParagraph(currId, newId) {
        // add new node and edge to graph
        this.cy.add([
            { group: 'nodes', data: { id: newId } },
            { group: 'edges', data: { id: `${currId}${newId}`, source: currId, target: newId } }
        ]);

        this.cy.$(`#${newId}`).css({ label: 'Enter description' });

        this.resetZoom();
    }

    editParagraph(paragraphId, paragraphNumber, paragraphDescription) {
        this.cy.$(`#${paragraphId}`).css({ label: `${paragraphNumber}. ${paragraphDescription}` });
    }

    deleteParagraph(paragraphId) {
        this.cy.remove(`#${paragraphId}`);
    }
}