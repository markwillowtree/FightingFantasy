class CytoRepository {
    cy

    constructor(cy) {
        this.cy = cy;
    }

    updateGraph(playthrough) {
        cy.$('node').remove();
        cy.$('edge').remove();

        var startParagraph = playthrough.startParagraph;

        cy.add([
            { group: 'nodes', data: { id: `${startParagraph.id}` } }
        ]);
        cy.$(`#${startParagraph.id}`)
            .css({ label: `${startParagraph.number} ${startParagraph.description}`  });

        console.log(`Adding node ${startParagraph.id}`);

        var prev = startParagraph;
        var curr = startParagraph.toParagraph;

        while (curr != undefined) {
            cy.add([
                { group: 'nodes', data: { id: `${curr.id}` } },
                { group: 'edges', data: { id: `${prev.id}${curr.id}`, source: `${prev.id}`, target: `${curr.id}`} }
            ]);
            
            console.log(`Adding node ${curr.id} and edge ${prev.id}${curr.id}`);

            cy.$(`#${curr.id}`).css({ label: `${curr.number} ${curr.description}` });

            console.log(`Adding description ${curr.description} on ${curr.id}`);

            prev = curr;
            curr = curr.toParagraph;
        }

        var layout = cy.layout({
            name: 'grid',
            fit: true
        });

        layout.run();
    }


    appendParagraph(currId, newId) {
        // add new node and edge to graph
        cy.add([
            { group: 'nodes', data: { id: newId } },
            { group: 'edges', data: { id: `${currId}${newId}`, source: currId, target: newId } }
        ]);

        cy.$(`#${newId}`).css({ label: 'Enter description' });

        var layout = cy.layout({
            name: 'grid',
            fit: true
        });

        layout.run();
    }

    editParagraph(paragraphId, paragraphNumber, paragraphDescription) {
        cy.$(`#${paragraphId}`).css({ label: `${paragraphNumber}. ${paragraphDescription}` });
    }

    deleteParagraph(paragraphId) {
        cy.remove(`#${paragraphId}`);
    }
}