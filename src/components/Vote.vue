<!-- @format -->

<template>
	<h1 class="align-center">Live Text Vote <button class="reset" @click="resetVote">reset vote</button></h1>
	<h2>Vote Line: +1 (670) 366-2467</h2>
	<div>Watch for live update when your vote is cast.</div>
	<div>
		<div class="align-end">
			<div :style="{ width: markWidth }" class="voteLevel background-blue">
				Mark ({{ parseFloat(markWidth) / 70 }})
			</div>
			<img src="../assets/images/Guy.png" :width="markImageWidth" alt="" />
		</div>
		<h3>Text "1" to vote for Mark</h3>
		<div class="align-end">
			<div :style="{ width: johnWidth }" class="voteLevel background-green">
				John ({{ parseFloat(johnWidth) / 70 }})
			</div>
			<img src="../assets/images/AfroFem.png" :width="johnImageWidth" alt="" />
		</div>
		<h3>Text "2" to vote for John</h3>

		<div class="align-end">
			<div :style="{ width: steveWidth }" class="voteLevel background-red">
				Steve ({{ parseFloat(steveWidth) / 70 }})
			</div>
			<img src="../assets/images/IndianMan.png" :width="steveImageWidth" alt="" />
		</div>
		<h3>Text "3" to vote for Steve</h3>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import { db } from "../firebase/config";
	import { setDoc, doc, onSnapshot } from "firebase/firestore";

	const increment = (votecount, num) => {
		return votecount * num;
	};

	const markWidth = ref("35px");
	const johnWidth = ref("35px");
	const steveWidth = ref("35px");

	const markImageWidth = ref(150);
	const johnImageWidth = ref(150);
	const steveImageWidth = ref(150);

	const resetVote = async () => {
		await setDoc(doc(db, "elections", "exampleVote"), {
			Mark: 0,
			John: 0,
			Steve: 0,
		});
	};

	onSnapshot(doc(db, "elections", "exampleVote"), (doc) => {
		const { Mark, John, Steve } = doc.data();
		markWidth.value = increment(Mark, 70) + "px";
		johnWidth.value = increment(John, 70) + "px";
		steveWidth.value = increment(Steve, 70) + "px";

		markImageWidth.value = 150 + increment(Mark, 8);
		johnImageWidth.value = 150 + increment(John, 8);
		steveImageWidth.value = 150 + increment(John, 8);
	});
</script>

<style scoped>
	.voteLevel {
		color: white;
		height: 35px;
		min-width: 35px;
		font-size: large;
		margin: 35px 0px 0px 0px;
		padding: 20px;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: end;
		border-radius: 5px;
	}

	.reset {
		margin-left: 20px;
		padding: 6px;
		cursor: pointer;
		border-radius: 5px;
		background-color: transparent;
	}

	.align-center {
		display: flex;
		align-items: center;
	}

	.align-end {
		display: flex;
		align-items: end;
		height: 175px;
	}
</style>
