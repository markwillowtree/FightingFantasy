function initialisePage(playthrough, selectedParagraphId) {
    // instantiate repositories and services
    var playthroughService = new PlaythroughService(playthrough, selectedParagraphId);
    var backendRepo = new BackendRepository();
    var cytoRepo = new CytoRepository(playthrough, 'mapCanvas');

    // initialise dice control
    var dice = new Dice(2, 500, 'dice');

    // set up event handlers
    $(document).ready(function () {

        $('#dice__btn').on('click ', function () {
            dice.rollDice();
        });

        // zoom buttons
        $('#zoomIn').on('click', function () {
            cytoRepo.incrementZoom()
        });

        $('#zoomOut').on('click', function () {
            cytoRepo.decrementZoom()
        });

        $('#resetZoom').on('click', function () {
            cytoRepo.resetZoom()
        });

        // add new paragraph button
        $('#addParagraph').on('click', function () {
            playthroughService.appendParagraph();
            cytoRepo.updateGraph(playthroughService.playthrough);
        });

        // delete last paragraph button
        $('#deleteLastParagraph').on('click', function () {
            playthroughService.deleteLastParagraph();

            cytoRepo.updateGraph(playthroughService.playthrough);
        });

        // update playthrough model when form is updated
        $(".form-control").change(function () {
            var control = $(this);
            var value = control.val();
            var attrName = control.attr('id');

            if (attrName == 'items') {
                playthroughService.editItems(value);
            }
            else if (attrName == 'paragraphNumber') {
                value = tryParseNumeric($(this), value);

                playthroughService.editNumber(value);
                var paragraph = playthroughService.selectedParagraph;
                cytoRepo.editParagraph(paragraph.id, value, paragraph.description);
            }
            else if (attrName == 'paragraphDescription') {
                playthroughService.editDescription(value);
                var paragraph = playthroughService.selectedParagraph;
                cytoRepo.editParagraph(paragraph.id, paragraph.number, value);
            }
            else {
                value = tryParseNumeric($(this), value);
                playthroughService.editStat(attrName, value);
            }
        });

        // select paragraph when graph node clicked
        cytoRepo.cy.on('mousedown', function (event) {
            if (event.target != cytoRepo.cy) {
                var id = event.target._private.data.id;
                playthroughService.setSelectedParagraph(id);
            }
        });

        // update form when paragraph selected
        $(playthroughService).on('paragraphSelected', function (evt, paragraph) {
            $('#paragraphNumber').val(paragraph.number);
            $('#paragraphDescription').val(paragraph.description);
            $('#items').val(paragraph.items);

            for (var i = 0; i < paragraph.stats.length; i++) {
                $(`#${paragraph.stats[i].name}`).val(paragraph.stats[i].value);
            }
        });
    });

    function tryParseNumeric(ctrl, value) {
        var val = Number(value);

        if (val == NaN || val == 0) {
            ctrl.val(0);
            return 0;
        }

        return val;
    }
}