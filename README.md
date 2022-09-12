# Reproduction for [RxAngular #1385](https://github.com/rx-angular/rx-angular/issues/1385)

1. Checkout Repo
2. `npm i`
3. `npm start`
4. Switch between the 2 todos on the page an see how the description gets out of sync until you click in the input field.
5. `npm i -E @rx-angular/cdk@1.0.0-beta.2`
6. Repeat no. 4, and see that the description is now in sync.
7. `npm i -E @rx-angular/cdk@1.0.0-beta.3`
8. Description is out of sync again.
