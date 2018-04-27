i've adopted a functional approach as this challenge involves a lot of
datashape-changing/combining. 

I used redux because a single call needed to update a lot of state, but it was a number of smaller components that were interested in the state.

Holding all the state in a single component and then passing it down seemed messy, unless i used redux which is for scenarios where centralized state is a good idea.



Things I could improve: Using a redux action to decide whether to poll the server seems a bit unintuitive and counter to redux convention.
