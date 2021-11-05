Functionality test:

1)
2)
3)
4)

Tesiting md:

1) how you implemented the unit test requirement from the previous lab (which testing library, which part(s) of the code, etc.), 

we are using jest testing library to test the fetch part of our chorme extension. This test should return true if it actually fectch cetrain Youtube viedo content from Youtube.

2) your plans regarding unit tests going forward (it’s ok to not go all in with unit tests, but document and reason your decision.),

In our chrome extension, with features written down we can see the errors with BDD results (each result falls under the corresponding scenario in the BDD feature file, which provides better readability) instead of seeing the chrome stack which is completely absurdly hard to read.

3) how you satisfied the component/integration/end-to-end testing requirement from this lab (which testing library, which part(s) of the code, etc.), 

Because of our project design, Chrome extension. This type of project is hard test, we use a BDD approach testing. 

4) your plans regarding higher-level testing going forward (it’s again ok to not commit to an integrated testing solution, but document and reason your decision).

After we create more features for our current MVP project, we will provide more testing cases for each feature functionality to make sure this Chrome extension is working properly. 
