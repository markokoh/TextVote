<!-- @format -->

<template>
	<h1>Live Text Vote</h1>
	<h2>Vote Line: +1 (670) 366-2467</h2>
	<div>
		<div :style="{ width: markWidth }" class="voteLevel background-blue">
			Mark ({{ parseFloat(markWidth) / 70 }})
		</div>
		<h3>Text "1" to vote for Mark</h3>

		<div :style="{ width: johnWidth }" class="voteLevel background-green">
			John ({{ parseFloat(johnWidth) / 70 }})
		</div>
		<h3>Text "2" to vote for John</h3>

		<div :style="{ width: steveWidth }" class="voteLevel background-red">
			Steve ({{ parseFloat(steveWidth) / 70 }})
		</div>
		<h3>Text "3" to vote for Steve</h3>
	</div>

	<button style="margin-top: 25px" @click="resetVote">reset vote</button>
</template>

<script setup>
	import { ref } from "vue";
	import { db } from "../firebase/config";
	import { setDoc, doc, onSnapshot } from "firebase/firestore";

	const increment = (votecount) => {
		// 1 VOTE IS REPRESENTED BY 70px
		return votecount * 70;
	};
	const markWidth = ref("35px");
	const johnWidth = ref("35px");
	const steveWidth = ref("35px");

	const resetVote = async () => {
		await setDoc(doc(db, "elections", "exampleVote"), {
			Mark: 0,
			John: 0,
			Steve: 0,
		});
	};

	onSnapshot(doc(db, "elections", "exampleVote"), (doc) => {
		const { Mark, John, Steve } = doc.data();
		markWidth.value = increment(Mark) + "px";
		johnWidth.value = increment(John) + "px";
		steveWidth.value = increment(Steve) + "px";
	});
</script>

<style>
	.voteLevel {
		color: white;
		height: 35px;
		min-width: 35px;
		font-size: large;
		margin: 50px 0px 20px 0px;
		padding: 20px;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: end;
		border-radius: 5px;
	}
</style>
