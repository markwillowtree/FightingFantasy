class PlaythroughService {
    selectedParagraph;
    playthrough;
    repository;

    constructor(playthrough, selectedParagraphId) {
        this.playthrough = playthrough;
        this.selectedParagraph = this.getParagraph(selectedParagraphId);
        this.repository = new BackendRepository();
    }

    /**
    * Adds a new paragraph with the stats of 
    * the last paragraph in the playthrough.
    * @throws error when pararaph could not be added
    */
    appendParagraph() {
        // get current last paragraph
        var lastParagraph = this.getLastParagraph();

        // create new paragraph with same items and stats 
        var newParagraph = {
            items: lastParagraph.items,
            stats: new Array(lastParagraph.stats.length),
            description: 'Enter a description',
            xpos: lastParagraph.xPos,
            ypos: lastParagraph.yPos + 50,
            number: 0
        };

        for (var i = 0; i < lastParagraph.stats.length; i++) {
            newParagraph.stats[i] = {
                name: lastParagraph.stats[i].name,
                value: lastParagraph.stats[i].value,
                statId: lastParagraph.stats[i].statId,
                bookStatId: lastParagraph.stats[i].bookStatId
            };
        }
        

        // save it to backend
        newParagraph = this.repository.appendParagraph(this.playthrough.id, newParagraph);
        if (newParagraph == undefined) {
            throw 'error appending paragraph';
        }

        // append new paragraph to current paragraph
        lastParagraph.toParagraphId = newParagraph.id;
        lastParagraph.toParagraph = newParagraph;

        // update selected paragraph
        this.setSelectedParagraph(newParagraph.id);
    }

    setSelectedParagraph(paragraphId) {
        this.selectedParagraph = this.getParagraph(paragraphId);
        $(this).trigger('paragraphSelected', this.selectedParagraph);
    }

    editPosition(x, y) {
        this.selectedParagraph.xPos = x;
        this.selectedParagraph.ypos = y;

        if (!this.repository.updateParagraph(this.playthrough.id, this.selectedParagraph)) {
            throw 'error updating paragraph';
        }
    }
    /**
    * Edits item
    * @param {string} items
    * @throws error when item could not be updated
    */
    editItems(items) {
        this.selectedParagraph.items = items;
        if (!this.repository.updateParagraph(this.playthrough.id, this.selectedParagraph)) {
            throw 'error updating paragraph';
        }
    }

    /**
    * Edits number
    * @param {number} number
    * @throws error when number could not be updated
    */
    editNumber(number) {
        this.selectedParagraph.number = number;
        if (!this.repository.updateParagraph(this.playthrough.id, this.selectedParagraph)) {
            throw 'error updating paragraph';
        }
    }

    /**
    * Edits description
    * @param {string} description
    * @throws error when description could not be updated
    */
    editDescription(description) {
        this.selectedParagraph.description = description;
        if (!this.repository.updateParagraph(this.playthrough.id, this.selectedParagraph)) {
            throw 'error updating paragraph';
        }
    }

    /**
    * Edits stat
    * @param {string} name 
    * @param {number} value 
    * @throws error when stat could not be updated
    */
    editStat(name, value) {
        for (var i = 0; i < this.selectedParagraph.stats.length; i++) {
            if (this.selectedParagraph.stats[i].name == name) {
                this.selectedParagraph.stats[i].value = value;
                break;
            }
        }
        if (!this.repository.updateParagraph(this.playthrough.id, this.selectedParagraph)) {
            throw 'error updating paragraph';
        }
    }

    /**
    * Deletes last paragraph in the playthrough
    * @throws error when paragraph could not be deleted
    */
    deleteLastParagraph() {
        var last = this.getLastParagraph();
        var prev = this.getPreviousParagraph(last);


        if (!this.repository.deleteLastParagraph(this.playthrough.id)) {
            throw 'error deleting paragraph';
        }


        prev.toParagraph = undefined;
        prev.toParagraphId = undefined;

        this.setSelectedParagraph(prev.id);
    }

    getParagraph(id) {
        var currParagraph = playthrough.startParagraph;

        while (currParagraph != undefined) {
            if (currParagraph.id == id)
                return currParagraph;
            else
                currParagraph = currParagraph.toParagraph;
        }

        throw `invalid paragraph id ${id}`;
    }

    getLastParagraph() {
        var currParagraph = playthrough.startParagraph;
        while (currParagraph.toParagraph != undefined) {
            currParagraph = currParagraph.toParagraph
        }

        return currParagraph;
    }

    getPreviousParagraph(currParagraph) {
        var prevParagraph = playthrough.startParagraph;

        do {
            if (prevParagraph.toParagraph.id == currParagraph.id)
                return prevParagraph;
            else
                prevParagraph = prevParagraph.toParagraph;
        } while (prevParagraph != undefined);

        throw 'No previous paragraph found';
    }

    getNumParagraphs() {
        var count = 0;
        var curr = this.playthrough.startParagraph;

        while (curr != undefined) {
            count += 1;
            curr = curr.toParagraph;
        }
        return count;
    }
}