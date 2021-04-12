import { BookModel, PlayThroughModel, PlayThroughParagraphModel, PlaythroughStatModel } from "src/app/services/apiClient";

export function playthroughFactory(numParagraphs: number, numStats: number) {
    let book = new BookModel(
        {
          id: 1,
          code: 'FF1',
          description: 'Warlock of Firetop Mountain',
          title:  'Warlock of Firetop Mountain',
          stats: ['Stamina']
        }
      );

      let paragraphs = new Array<PlayThroughParagraphModel>();

      for(let i = 0; i < numParagraphs; i++) {
          let paragraph = new PlayThroughParagraphModel({
              description: '',
              id: i,
              items: '',
              number: i,
              stats: new Array<PlaythroughStatModel>()            
          })

          for(let j = 0; j < numStats; j++) {
              let stat = new PlaythroughStatModel({
                  statId: j,
                  value: 0
              });

              paragraph.stats.push(stat);
          }

          paragraphs.push(paragraph);
      }

      for(let i = 1; i < numParagraphs; i++) {
          paragraphs[i -1].toParagraph = paragraphs[i];
          paragraphs[i-1].toParagraphId = paragraphs[i].id;
      }

      let playthrough: PlayThroughModel = new PlayThroughModel(
        {
          startParagraph: paragraphs[0],
          book: book
        }
      );

      return playthrough;

}