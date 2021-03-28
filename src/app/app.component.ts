import { Component } from '@angular/core';
import * as tf from '@tensorflow/tfjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyApp';
  xdata = "sample string";
  ipdata: number = 0;
  data: number = 0;

  ipdata2: number = 0;
  data2: number = 0;


  func(myform) {

    const model = tf.sequential();

    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });


    // Prepare training data
    const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
    const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);

    // Train the model
    model.fit(xs, ys, { epochs: 50 }).then(() => {

      model.save("downloads://modds");

      var j = model.predict(tf.tensor2d([myform.value.ipData], [1, 1])) as tf.Tensor;

      // Use model to predict values
      this.data = j.dataSync()[0];
    });



  }



  async func2(myForm2) {

    var model2 = await tf.loadLayersModel("localstorage://modds");



    var j = model2.predict(tf.tensor2d([myForm2.value.ipData2], [1, 1])) as tf.Tensor;

    this.data2 = j.dataSync()[0];

  }
}

